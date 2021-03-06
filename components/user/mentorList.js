import React, { Component } from 'react';
import ProfileCard from './profileCard'
import fetch from 'isomorphic-fetch';

export default class MentorList extends Component {
	constructor(props) {
		super(props);
	}

	okayToShow(user, profile) {
		if (profile.username == user) {
			return false;
		}
		if (profile.blocked && profile.blocked.indexOf(user) != -1) {
			return false;
		}
		if (profile.mentees && profile.mentees.indexOf(user) != -1) {
			return false;
		}
		return true;
	}

	renderMentors() {
		const mentors = this.props.mentors;
		const user = this.props.user;
		const incrementRequested = this.props.incrementRequested
		console.log("mentors in renderMentors");
		console.log(mentors);
		return (
			mentors.map( (item, i) => (
				this.okayToShow(user, item) ? (
					<ProfileCard
						key={item.username + i}
						incrementRequested={incrementRequested}
						actionable={item.requestedMentees.indexOf(user) == -1}
						bio={item.mentorBio}
						email={item.email}
						firstName={item.firstName}
						lastName={item.lastName}
						location={item.location}
						rating={item.rating500 / 100}
						tags={item.tags}
						type={"search"}
						username={item.username}
					/>
				) : null
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
