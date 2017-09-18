import React, { Component } from 'react';
import {Provider , observer} from 'mobx-react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {observable} from 'mobx';
import Login from './pages/login.js';
import Regist from './pages/regist/regist.js';
import Perf from 'react-addons-perf';
import {Helmet} from "react-helmet";
window.Perf=Perf;

const store={
	style:observable({
		color:'#000',
		background:'#FFF'
	})
}

@observer class App extends Component{
	render(){
		return (
			<div className='App' style={store.style} >
				<Helmet>
					<title>React App</title>
					<meta name="description" content="React mobx project" />
				</Helmet>
				<Provider store = {store} >
					<BrowserRouter>
						<Switch>
						<Route component={Regist} path='/regist'/>
						<Route component={Login} />
						</Switch>
					</BrowserRouter>
				</Provider>
			</div>
		)
	}
}


export default App;