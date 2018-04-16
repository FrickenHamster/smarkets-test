import React, { Component } from 'react';
import { Redirect } from 'react-router';

import './TopEvents.css';

export default class TopEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {events: [], status: 'load'};
		this.redirect = this.redirect.bind(this);
	}

	componentDidMount() {
		fetch('/events/popular/')
			.then(response => response.json())
			.then(json => {
				const events = [];
				for (const e of json.results) {
					events.push({
						name: e.name,
						id: e.id
					});
				}
				this.setState({events, status: 'done'});
			})
			.catch(e => {
				console.log('error', e);
				this.setState({status: 'error'});
			})
	}

	redirect(route) {
		this.setState({redirect: route});
	}

	render() {
		if (this.state.redirect) {
			return (<Redirect push to={this.state.redirect}/>);
		}
		let content;
		if (this.state.status === 'load') {
			content = (
			<div className='container'>
				<h2>
				LOADING
				</h2>
			</div>
			)
		} else if (this.state.status === 'error') {
			content = (
				<div className='container'>
					<h2>
						ERROR Please try again
					</h2>
				</div>
			)
		} else {
			const ee = this.state.events.map(e => (<Event name={e.name} key={e.id} id={e.id} redirect={this.redirect}/>));
			content = (
				<div className='container'>
					{ee}
				</div>
			)
		}


		return (
			<div>
				<h1>
					Top Events
				</h1>
				{content}
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
