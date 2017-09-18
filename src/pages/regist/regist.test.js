import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Regist from './regist.js';
import store from './registStore.js';

function renderPage(){
	const div = document.createElement('div');
	window.environment='dev';
	ReactDOM.render(<BrowserRouter> 
	  					<Route component={Regist} ></Route>
	  				</BrowserRouter>, div);
}

it('渲染页面', () => {
  	renderPage();
});

it('获取验证码',()=>{
	renderPage();
	expect(store.captcha).toEqual('');
	expect(store.timer).toEqual(0);
	store.getCaptcha();
	setTimeout(()=>{
		expect(store.captcha).toEqual('888888');
		expect(store.timer).toEqual(0);
	},30500)
})



