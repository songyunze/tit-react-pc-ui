import { observable } from 'mobx'
class HostUser {

  @observable user = {}
  isload=0
  constructor() {
    this.getHost()
  }


  getHost = ()=> {
    var _this=this;
    setTimeout(()=>{
      _this.user={
      empno:'CHS00001',
      name:'卢丽华',
      lev:'12',
      levName:'助理理赔员',
      companyName:'湖南分公司',
      email:'lulihua@cpic.com',
      ucno:'c_lulihua',
      tele:'13200009876'
    }
    _this.isload++;
  },1000)
  }
}

export default new HostUser()