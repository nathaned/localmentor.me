import React, { Component } from 'react';
import ProfileCard from './profileCard'
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
					<ProfileCard
						username = {item.username}
						rating = {item.rating}
						profileText = {item.profileText}
						distanceAway = {item.distanceAway}
						tags = {item.Tags}
						key = {i}
						expanded = {0}
						firstName = {item.firstName}
						lastName = {item.lastName}
					/>

			));
		}
		else this.loadMentors(id, query)
	}

	renderMentors() {
		const mentors = this.props.mentors;
		console.log("mentors in renderMentors");
		console.log(mentors);
		return (
			mentors.map( (item, i) =>
				<ProfileCard
					username = {item.username}
					rating = {item.rating}
					profileText = {item.profileText}
					distanceAway = {item.distanceAway}
					tags = {item.tags}
					key = {i}
					expanded = {0}
					firstName = {item.firstName}
					lastName = {item.lastName}
				/>
			)
		);
	}

	render() {
		const mentors = this.props.mentors;
		if (!mentors || mentors.length == 0) {
			return (
				<div>No results.</div>
			)
		}

		return (
			<div className="mentor list">
				{ this.renderMentors() }
			</div>
		);
	}
}
