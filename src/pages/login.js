import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Fecth from '../utils/fetch.js';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Link } from 'react-router-dom';
const FormItem = Form.Item;
let userName=observable("");

class NormalLoginForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let retVal = values.password === '123'?{login:true,user:values.user}:{login:false};
	      Fecth.post('login',values,retVal).then((result)=>{
	      	if(result.login){
	      		alert("登录成功！")
	      	}else{
	      		alert("用户名/密码错误！")
	      	}
	      })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '用户名不能为空!' }],
            initialValue:window.history.state?window.history.state.state.userName:''
          })(
            <Input id='userName' onChange={(e)=>{userName=e.target.value}}  prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码不能为空!' }],
          })(
            <Input id='password' prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <UserNameLink id='forgot' className="login-form-forgot" to={{
          	pathname:'/forgot'
          }} >忘记密码?</UserNameLink>
          <br/>
          <Button id='login' type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          或者 <UserNameLink id='regist' to={{
          	pathname:'/regist'
          }} >注册</UserNameLink>
        </FormItem>
      </Form>
    );
  }
}

@observer class UserNameLink extends Component{
	render(){
		const {to}=this.props;
		if(typeof userName === 'string'){
      to.state={userName}
    }else{
      to.state={userName:''}
    }
		return (
				<span><Link {...this.props} >{this.props.children}</Link></span>
			)
	}
}


const LoginForm=Form.create()(NormalLoginForm);

class Login extends Component {
	render(){
		return (<div>
				<div style={{height:window.innerHeight,overflow:'hidden'}} > 
					<img style={{width:'100%'}}  src={require('../imgs/SoftBlue.jpg')} alt="" />
				</div>

				<div style={{position:'fixed',width:'20%',left:'40%',top:200}} >
						<LoginForm/>
					</div>
				</div>
				)
	}
}
export default Login;