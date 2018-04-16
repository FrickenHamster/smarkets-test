import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import hdate from 'human-date';

import './EventDetails.css';

export default class EventDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {status: 'load'}
	}

	componentDidMount() {
		fetch(`/events/id/${this.props.match.params.id}/`)
			.then(resp => resp.json())
			.then(json => {
				this.setState({
					status: 'done',
					event: {
						name: json.event.name,
						league: json.event.parent_name,
						start: json.event.start_datetime,
						type: json.event.event_type
					}
				});
			}).catch(e => {
			console.log('error', e);
			this.setState({
				status: 'error'
			})
		})
	}

	render() {
		let content;
		if (this.state.status === 'load') {
			content = (
				<div>
					<h1>LOADING</h1>
				</div>);
		} else if (this.state.status === 'error') {
			content = (
				<div>
					<h1>ERROR please try again</h1>
				</div>);
		} else {
			content = (<div className='event-detail-container text-center'>
				<h1 className='mb-2'>{this.state.event.name}</h1>
				<div className='event-attr-text'><b>type</b>: {this.state.event.type}</div>
				<div className='event-attr-text'><b>league</b>: {this.state.event.league}</div>
				<div className='event-attr-text'><b>start time</b>: {hdate.prettyPrint(this.state.event.start)}</div>
			</div>)

		}

		return (<div className='text-center'>
			<div className='container'>
			{content}
			</div>
			<Link to='/' className='btn btn-primary mt-4'> Back </Link>
		</div>)
	}
}
