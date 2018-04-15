import React, { Component } from 'react';
import ProfileCard from './profileCard'
import fetch from 'isomorphic-fetch';

export default class MentorList extends Component {
	constructor(props) {
		super(props);
	}

	renderMentors() {
		const mentors = this.props.mentors;
		const user = this.props.user;
		console.log("mentors in renderMentors");
		console.log(mentors);
		return (
			mentors.map( (item, i) => (item.username == user ? null :
				<ProfileCard
					key={item.username + i}
					actionable={item.requestedMentees.indexOf(user) == -1}
					bio={item.bio}
					email={item.email}
					firstName={item.firstName}
					lastName={item.lastName}
					location={item.location}
					rating={item.rating500 / 100}
					tags={item.tags}
					type={"search"}
					username={item.username}
				/>
			))
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
