class Fecth {
	constructor(){
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
	get(url,args,retVal,options){
		return fetchFactory(url,args,retVal,options,"GET");
	}
	post(url,args,retVal,options){
		return fetchFactory(url,args,retVal,options,"POST")
	}
	put(url,args,retVal,options){
		return fetchFactory(url,args,retVal,options,"PUT")
	}
	delete(url,args,retVal,options){
		return fetchFactory(url,args,retVal,options,"DELETE")
	}
}

function fetchFactory(url,args,retVal,options,method){
	return new Promise( async (resolve,reject)=>{
		try{
			//当开发环境时直接返回第三个参数。
			if(window.environment==='dev'){
				setTimeout(()=>{
					resolve(retVal||{});
				},1000)
			}else{
				
				if(method==="GET"){
					if(typeof args === 'object'){
						url+=jsonToQureyString(args);
					}else if(typeof args === 'string'){
						url += args;
					}else{
						throw new Error('传入的参数必须是 object，string其一');
					}
					this.urlOptions.method='GET';
					//get 请求不准有body属性
					delete this.urlOptions.body
				}else{
					this.urlOptions.method=method;
					this.urlOptions.body=JSON.stringify(args);
				}

				if(options){
					Object.assign(this.urlOptions,options)
				}

				let response= await fetch(url,this.urlOptions);
				resolve(response.json());
				}

		}catch(e){
			console.log(e);
			reject(e);
		}
	})
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

export default new Fecth();