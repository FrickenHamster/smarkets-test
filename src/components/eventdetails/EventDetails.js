import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
						start: json.event.start_datetime
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
			content = (<div>
				<h1>{this.state.event.name}</h1>
				<div>league: {this.state.event.league}</div>
				<div>start time: {this.state.event.start}</div>
			</div>)

		}

		return (<div>
			{content}
			<Link to='/'> Back </Link>
		</div>)
	}
}
