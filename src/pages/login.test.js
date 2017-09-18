import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './login.js';

function renderPage(){
	return new Promise((reject,resolve)=>{
		const div = document.createElement('div');
		window.environment='dev';
		ReactDOM.render(<BrowserRouter> 
		  					<Route component={Login} ></Route>
		  				</BrowserRouter>, div);
		reject(true);
	})
}

it('渲染页面', () => {
  	renderPage();
});

it('输入用户名点击注册按钮',()=>{
	renderPage().then(()=>{
		document.getElementById('userName').value='songyunze';
		document.getElementById('regist').click();
		expect(window.history.state.state.userName).toEqual('songyunze');
	})
})

it('测试登录',()=>{
	renderPage();
	setTimeout(()=>{
		document.getElementById('userName').value='songyunze';
		document.getElementById('password').value='123';
		document.getElementById('login').click();
		document.getElementById('password').value='456';
		document.getElementById('login').click();
	},500)
})



