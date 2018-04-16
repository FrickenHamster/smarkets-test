import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import TopEvents from './components/topevents/TopEvents';
import EventDetails from './components/eventdetails/EventDetails';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Route exact path='/' component={TopEvents} />
					<Route path='/event/:id' component={EventDetails} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
