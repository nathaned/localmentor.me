import React, { Component } from 'react';
import ProfileCard from './profileCard'
import Head from '../head'
import fetch from 'isomorphic-fetch';

export default class ConnectionList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderMentors() {
		const mentors = this.props.mentors;
		console.log("mentors in renderMentors", mentors);

		if (!mentors || !mentors.length) {
			return (
				<div className="jumbotron trans">
					<p>You don't have any mentors yet! Head over to the <strong>Find a Mentor</strong> page to request a mentor.</p>
					<a href="/find-a-mentor" className="btn btn-lg btn-primary">Find a Mentor</a>
				</div>
			);
		}

		return (this.renderProfiles(mentors, "connection", true));
	}

	renderMentees() {
		const mentees = this.props.mentees;
		console.log("mentees in renderMentees", mentees);

		if (!mentees || !mentees.length) {
			return (
				<div className="jumbotron trans">
					<p>You don't have any mentees yet! Mentors who have updated their bio, tags, and profile pictures have the best chance of gaining connections.</p>
					<a href="/my-profile" className="btn btn-lg btn-primary">Edit Profile</a>
				</div>
			);
		}

		return (this.renderProfiles(mentees, "connection"));
	}

	renderMenteeRequests() {
		const requestedMentees = this.props.requestedMentees;
		console.log("menteeRequests in renderMenteeRequests", requestedMentees);

		if (!requestedMentees || !requestedMentees.length) {
			return null;
		}

		return (
			<div className="jumbotron connections">
				<h2>Requests</h2>
				{this.renderProfiles(requestedMentees, "request")}
			</div>
		);
	}

	renderRatings() {
		const ratings = this.props.toRate;
		console.log("toRate in renderRatings: ", ratings);

		if (!ratings || !ratings.length) {
			return null;
		}
		return (
			<div className="jumbotron connections">
				<h2>Ended Mentorships</h2>
				{this.renderProfiles(ratings, "rate")}
			</div>
		)
	}

	renderProfiles(profiles, type, isMentor = false) {
		return (
			<div>
				{profiles.map( (item, i) =>
					<ProfileCard
						key={item.username}
						actionable={true}
						bio={ isMentor ? item.mentorBio : item.menteeBio }
						email={item.email}
						firstName={item.firstName}
						lastName={item.lastName}
						location={item.location}
						profileText={item.profileText}
						rating={item.rating}
						refresh={this.props.refresh}
						tags={item.tags}
						type={type}
						username={item.username}
					/>
				)}
			</div>
		);
	}

	render() {
		// big todo: see if we can use the `mentorList.js` for this stuff
		return (
			<div>

				{ this.renderRatings() }

				{ this.renderMenteeRequests() }

				{ this.props.isMentee ? (
					<div className="jumbotron connections">
						<h2>Your Mentors</h2>
						{ this.renderMentors() }
					</div>
				) : null }

				{ this.props.isMentee ? (
					<div className="jumbotron connections">
						<h2>Your Mentees</h2>
						{ this.renderMentees() }
					</div>
				) : null }



			</div>

			)
	}
}
