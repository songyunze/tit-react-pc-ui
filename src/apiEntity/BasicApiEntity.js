import {observable} from 'mobx';
import Fetch from '../utils/fetch.js';
class BasicApiEntity{
	isload = 0;
	@observable
	entity = {};
	url = "";
	constructor(url){
		this.url=url;
	}

	modifyEntity(args){
		for(let k in args){
			this[`${k}Key`]=`${this.url}_${Math.random(10000)}`
		}
		Object.assign(this.entity,args);
	}



	getEntity(args,retVal){
		if(!retVal){
			retVal=this.GETResp||{};
		}
		return Fetch.get(this.url,args,retVal).then((data)=>{
			this.modifyEntity(data);
			return data;
		})
	}
	putEntity(args,retVal){
		if(!retVal){
			retVal=this.PUTResp||{};
		}
		return Fetch.put(this.url,args,retVal).then((data)=>{
			return data;
		})
	}
	postEntity(args,retVal){
		if(!retVal){
			retVal=this.POSTResp||{};
		}
		return Fetch.post(this.url,args,retVal).then((data)=>{
			return data;
		})
	}
	deleteEntity(args,retVal){
		if(!retVal){
			retVal=this.DELETEResp||{};
		}
		return Fetch.delete(this.url,args,retVal).then((data)=>{
			return data;
		})
	}
}

export default BasicApiEntity