import React, { Component } from 'react';
import {observer} from 'mobx-react';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
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
window.store=store;

@observer class App extends Component{
	render(){
		return (
			<div className='App' style={store.style} >
				<Helmet>
					<title>React App</title>
					<meta name="description" content="React mobx project" />
				</Helmet>
					<BrowserRouter>
					<div>
						<Route exact path='/regist' component={Regist}/>
						<Route exact path="/" component={Login} />
					</div>
					</BrowserRouter>
			</div>
		)
	}
}


export default App;