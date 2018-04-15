import React, { Component } from 'react';
import ProfileCard from './profileCard'
import fetch from 'isomorphic-fetch';

export default class MentorList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderMentors() {
		const mentors = this.props.mentors;
		console.log("mentors in renderMentors");
		console.log(mentors);
		return (
			mentors.map( (item, i) =>
				<ProfileCard
					key={item.username + i}
					email={item.email}
					firstName = {item.firstName}
					lastName = {item.lastName}
					location = {item.location}
					profileText = {item.profileText}
					rating = {item.rating500 / 100}
					tags = {item.tags}
					username = {item.username}
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
