import React, { Component } from 'react';

import './TopEvents.css';

export default class TopEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {events:[]};
	}
	
	componentDidMount() {
		fetch('/events/popular/')
			.then(response => response.json())
			.then(json => {
				console.log(json);
				const events = [];
				for (const e of json.results) {
					events.push({
						name: e.name
					});
				}
				this.setState({events});
			})
			.catch(e => {
				console.log('error', e);
			})
	}
	
	render() {
		const ee = this.state.events.map(e => (<Event name={e.name}/>));
		
		return (
			<div>
				<h1>
					Top Events
				</h1>
				<div className='container'>
				{ee}
				</div>
			</div>
		);
	}
}

class Event extends Component {
	
	render() {
		return (
			<div className="m-4 top-event-container">
				<h3>{this.props.name}</h3>
			</div>
		)
	}
	
}
