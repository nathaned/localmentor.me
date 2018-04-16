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

		return (this.renderProfiles(requestedMentees, "connection"));
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

		return (this.renderProfiles(requestedMentees, "connection"));
	}

	renderMenteeRequests() {
		const requestedMentees = this.props.requestedMentees;
		console.log("menteeRequests in renderMenteeRequests", requestedMentees);

		if (!requestedMentees || !requestedMentees.length) {
			return null;
		}

		return (
			<div>
				<h2>Requests</h2>
				{this.renderProfiles(requestedMentees, "request")}
			</div>
		);
	}

	renderProfiles(profiles, type) {
		return (
			<div>
				{profiles.map( (item, i) =>
					<ProfileCard
						key={item.username}
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

				{ this.renderMenteeRequests() }

				{ this.props.isMentee ? (
					<div>
						<h2>Your Mentors</h2>
						{ this.renderMentors() }
						<ProfileCard
							username={"abc"}
							rating500={5}
							email="lol11.com"
							bio={"NOTHING bio"}
							tags={ ["hahah TAgs", "LOL"] }
							location={"Orlando"}
							key={2}
							type="connection"
							refresh={this.props.refresh}
							firstName={"ajjjjay "}
							lastName={"Mentor"}
						/>
					</div>
				) : null }

				{ this.props.isMentee ? (
					<div>
						<h2>Your Mentees</h2>
						{ this.renderMentees() }
						<ProfileCard
							username={"abc"}
							rating500={5}
							email="lol2.com"
							bio={"NOTHING bio"}
							tags={ ["hahah TAgs", "LOL"] }
							location={"Orlando"}
							key={3}
							firstName={"ajjjjay "}
							lastName={"Mentee"}
						/>
						<ProfileCard
							username={"abc"}
							email="lol3.com"
							rating500={5}
							bio={"NOTHING bio"}
							tags={ ["hahah TAgs", "LOL"] }
							location={"Orlando"}
							key={4}
							firstName={"ajjjjay "}
							lastName={"Mentee"}
						/>
					</div>
				) : null }



			</div>

			)
	}
}
