import React, { Component } from 'react';
import ProfileCard from './profileCard'
import fetch from 'isomorphic-fetch';

export default class ConnectionList extends Component {
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
					username = {item.username}
					rating = {item.rating}
					profileText = {item.profileText}
					distanceAway = {item.distanceAway}
					tags = {item.tags}
					key = {i}
					connections = {1}
					expanded = {0}
					firstName = {item.firstName}
					lastName = {item.lastName}
				/>
			)
		);
	}
	
	renderMentees() {
		const mentees = this.props.mentees;
		console.log("mentees in renderMentees");
		console.log(mentees);
		return (
			mentors.map( (item, i) =>
				<ProfileCard
					username = {item.username}
					rating = {item.rating}
					profileText = {item.profileText}
					distanceAway = {item.distanceAway}
					tags = {item.tags}
					key = {i}
					connections = {1}
					expanded = {0}
					firstName = {item.firstName}
					lastName = {item.lastName}
				/>
			)
		);
	}

	render() {
		const mentors = this.props.mentors;
		const mentees = this.props.mentees;
		
		return (
		
			<div className="mentee list">
				<ProfileCard
					username = {"abc"}
					rating500 = {5}
					bio = {"NOTHING bio"}
					distanceAway = {1000}
					tags = { ["hahah TAgs", "LOL"] }
					key = {0}
					connections = {1}
					expanded = {1}
					firstName = {"ajjjjay "}
					lastName = {"something"}
				/>
			</div>
		)

	}
}
