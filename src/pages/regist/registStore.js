import {observable , action } from 'mobx';
import Fecth from '../../utils/fetch.js';
class RegistStore {
	@observable timer = 0
	@observable userName = ""
	captcha = ""
	residences = [{
				  value: 'zhejiang',
				  label: '浙江',
				  children: [{
				    value: 'hangzhou',
				    label: '杭州',
				    children: [{
				      value: 'xihu',
				      label: '西湖',
				    }],
				  }],
				}, {
				  value: 'jiangsu',
				  label: '江苏',
				  children: [{
				    value: 'nanjing',
				    label: '南京',
				    children: [{
				      value: 'zhonghuamen',
				      label: '中华门',
				    }],
				  }],
				}]
	confirmDirty = false
	@observable autoCompleteResult = []

	@action getCaptcha(){
		if(this.timer===0){
            let retVal={captcha:"888888"};
            this.timer=30;
            let interval=setInterval(()=>{
              if(this.timer>0){
                this.timer--;
              }else{
                clearInterval(interval)
              }
            },1000)
            Fecth.post('getCaptcha',{},retVal).then((result)=>{
              this.captcha=result.captcha;
              alert("您的验证码是："+this.captcha)
            })
        }
	}

	changeConfirmDirty(value){
		this.confirmDirty=this.confirmDirty || !!value
	}

	@action webSiteAutoComplete(value){
		if (!value) {
	      this.autoCompleteResult = [];
	    } else {
	      this.autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
	    }
	}


}

export default new RegistStore();