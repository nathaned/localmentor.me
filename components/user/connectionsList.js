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
					connected = {1}
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
			mentees.map( (item, i) =>
				<ProfileCard
					username = {item.username}
					rating = {item.rating}
					profileText = {item.profileText}
					distanceAway = {item.distanceAway}
					tags = {item.tags}
					key = {i}
					connections = {1}
					connected = {1}
					expanded = {0}
					firstName = {item.firstName}
					lastName = {item.lastName}
				/>
			)
		);
	}
	
	renderMentorRequests() {
		const mentorRequests = this.props.mentorRequests;
		console.log("mentorRequests in renderMentorRequests");
		console.log(mentorRequests);
		return (
			mentorRequests.map( (item, i) =>
				<ProfileCard
					username = {item.username}
					rating = {item.rating}
					profileText = {item.profileText}
					distanceAway = {item.distanceAway}
					tags = {item.tags}
					key = {i}
					connections = {0}
					expanded = {0}
					firstName = {item.firstName}
					lastName = {item.lastName}
				/>
			)
		);
	}
	
	
	renderMenteeRequests() {
		const menteeRequests = this.props.menteeRequests;
		console.log("menteeRequests in renderMenteeRequests");
		console.log(menteeRequests);
		return (
			menteeRequests.map( (item, i) =>
				<ProfileCard
					username = {item.username}
					rating = {item.rating}
					profileText = {item.profileText}
					distanceAway = {item.distanceAway}
					tags = {item.tags}
					key = {i}
					connections = {0}
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
		const menteesRequests = this.props.menteesRequests;
		const mentorsRequests = this.props.mentorsRequests;
		
		return (
		
			<div>
		
				<Head
					cssFiles={[
						"dashboard.css",
						"dashboardNav.css",
						"profileCard.css",
						"react-select.min.css",
						"jumbo.css"
					]}
					title="Dashboard" />
			
				<div>
					<div className="jumbotron connections">
						<h2> Requests</h2>	
						<ProfileCard
								username = {"abc"}
								rating500 = {0}
								bio = {"Something bio"}
								distanceAway = {0}
								tags = { ["SAd TAgs", "Im SAd"] }
								location = {"Orlando"}
								key = {0}
								connected = {0}
								connections = {1}
								expanded = {1}
								firstName = {"NATHANNN2 "}
								lastName = {"nothing2"}
						/>
					</div>
					
					<div className="jumbotron connections">
					
						<h2> MENTORS </h2>
							<ProfileCard
								username = {"abc"}
								rating500 = {5}
								bio = {"NOTHING bio"}
								distanceAway = {1000}
								tags = { ["hahah TAgs", "LOL"] }
								location = {"Orlando"}
								key = {0}
								connections = {1}
								connected = {1}
								expanded = {1}
								firstName = {"ajjjjay "}
								lastName = {"Mentor"}
							/>
					</div>
					
					<div className="jumbotron connections">
						
						<h2> MENTEES </h2>
						<ProfileCard
							username = {"abc"}
							rating500 = {5}
							bio = {"NOTHING bio"}
							distanceAway = {1000}
							tags = { ["hahah TAgs", "LOL"] }
							location = {"Orlando"}
							key = {0}
							connections = {1}
							connected = {1}
							expanded = {1}
							firstName = {"ajjjjay "}
							lastName = {"Mentee"}
						/>
					</div>
				
				</div>
				
			</div>
				
			)
	}
}
