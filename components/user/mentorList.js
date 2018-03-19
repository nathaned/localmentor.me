import React, { Component } from 'react';
import MentorItem from './mentorItem';
import fetch from 'isomorphic-fetch';

export default class MentorList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async loadMentors(id, query) {
		const body = JSON.stringify({ query, id });
		const headers = { 'Content-Type': 'application/json' };
		const url = this.props.baseUrl + '/api/mentor-list';
		const response = await fetch(
			url,
			{ method: "POST", body, headers }
		);
		const res = await response.json();
		// note that if we do just `query`, it's shorthand for `query: query`
		this.setState({ mentors: res.list, query });
	}

	getMentors(id, query){
		if (this.state && this.state.query == query) {
			return (
				this.state.mentors.map((item, i) =>
					<MentorItem
						username={item.username}
						rating={item.rating}
						profileText={item.profileText}
						distanceAway={item.distanceAway}
						tags={item.Tags}
						key={i}
					/>
			));
		}
		else this.loadMentors(id, query)
	}

	render(props) {
		console.log("Logged in as " + this.props.user);
		return (
			<div className="mentor list">
				{ this.getMentors(0,"sampleQuery") }
			</div>
		);
	}
}
