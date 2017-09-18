import {observable} from 'mobx'
class BasicApiEntity{
	isload = 0;
	@observable
	entity = {};
	constructor(url){
		this.url=url;
		let headers=new Headers();
		//接收json文档
		headers.append('Content-Type','application/json');
		//编码格式为utf-8
		headers.append('Accept-Charset','utf-8');
		//接收gzip和deflate格式的压缩请求
		headers.append('Accept-Encoding', 'deflate');
		headers.append('Accept-Encoding', 'gzip');
		this.urlOptions={
			headers:headers,
			//same-origin 同源请求 cors跨域请求
			mode:'same-origin',
			//同源的时候发送cookie
			credentials:'same-origin',
			//检查缓存策略
			cache:'default',
			//跟随重定向
			redirect:'follow'
		}
	}

	modifyEntity(args){
		for(let k in args){
			this[`${k}Key`]=Math.random(10000)
		}
		Object.assign(this.entity,args);
	}



	getEntity(args){
		this.entityFactory(args,"GET")
	}
	putEntity(args){
		this.entityFactory(args,"PUT")
	}
	postEntity(args){
		this.entityFactory(args,"POST")
	}
	deleteEntity(args){
		this.entityFactory(args,"DELETE")
	}

	entityFactory(args,method){
		return new Promise( async (resolve,reject)=>{
			try{
				if(window.environment==='dev'){
					setTimeout(()=>{
						this.isload++;
						this.entity=this.getResp;
						resolve('return example');
					},1000)
				}else{
					let url=this.url;

					if(method==='GET'){
						if(typeof args === 'object'){
							url+=jsonToQureyString(args);
						}else if(typeof args === 'string'){
							url += args;
						}else{
							throw new Error('传入的参数必须是 object，array，string其一');
						}
						this.urlOptions.method='GET';
						//get 请求不准有body属性
						delete this.urlOptions.body
					}else{
						if(typeof args === 'object'){
							args.entity=this.entity
						}else{
							throw new Error('传入的参数必须是 object');
						}
						this.urlOptions.method=method;
						this.urlOptions.body=JSON.stringify(args);
					}
					
					let response= await fetch(url,this.urlOptions);
					this.entity=response.json();
					this.isload++;
					resolve(response);
					}

			}catch(e){
				console.log(e);
				reject(e);
			}
		})
	}
}

function jsonToQureyString(obj,path,queryString){
	queryString=queryString||'?';
	path=path||[];
	for(var k in obj){

		if(typeof obj[k] === 'function'){
			continue;
		}

		if(typeof obj[k] === 'object'){
			path.push(k);
			queryString=jsonToQureyString(obj[k],path,queryString);
		}else{
			if(!path.length){
				queryString+=`${k}=${obj[k]}&`;
			}else{
				var name="";
				for(var j in path){
					name+=j===0?path[j]:`[${path[j]}]`
				}
				name+=`[${k}]`
				queryString+=`${name}=${obj[k]}&`;
			}
			
		}
	}
	if(path.length){
		path.pop();
	}
	return queryString;
}

export default BasicApiEntity