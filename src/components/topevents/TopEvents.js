import React, { Component } from 'react';
import { Redirect } from 'react-router';

import './TopEvents.css';

export default class TopEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {events: []};
		this.redirect = this.redirect.bind(this);
	}

	componentDidMount() {
		fetch('/events/popular/')
			.then(response => response.json())
			.then(json => {
				console.log(json);
				const events = [];
				for (const e of json.results) {
					events.push({
						name: e.name,
						id: e.id
					});
				}
				this.setState({events});
			})
			.catch(e => {
				console.log('error', e);
			})
	}

	redirect(route) {
		this.setState({redirect: route});
	}

	render() {
		if (this.state.redirect) {
			return (<Redirect push to={this.state.redirect}/>);
		}

		const ee = this.state.events.map(e => (<Event name={e.name} key={e.id} id={e.id} redirect={this.redirect}/>));

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
			<div className="m-4 top-event-container"
				 onClick={_ => {
					 this.props.redirect(`event/${this.props.id}`);
				 }}
			>
				<h3>{this.props.name} {this.props.id}</h3>
			</div>
		)
	}

}
