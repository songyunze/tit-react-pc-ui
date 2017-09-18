import BasicApiEntity from './BasicApiEntity.js';
class User extends BasicApiEntity{
	constructor(){
		super('user')
		this.getResp=getResp;
		this.putResp=putResp;
	}
}

const getResp={
	empno:'CHS00001',
	name:'卢丽华',
	lev:'12',
	levName:'助理理赔员',
	companyName:'湖南分公司',
	email:'lulihua@cpic.com',
	ucno:'c_lulihua',
	tele:'13200009876'
}

const putResp={
	retMsg:"修改成功"
}

export default User