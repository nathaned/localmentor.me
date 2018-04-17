import React, { Component } from 'react';

export default class Contact extends Component {
	render() {
		return (
			<div className="jumbotron trans">
				<h1 className="cover-heading">Welcome to MentorMe.</h1>
				<h2> A Fun, Easy, and Safe way to find a mentor.</h2>
				<br/>
				<p>
					&emsp;&emsp;We all have aspects in our life that we would like to get help with.
					Whether that may be a starting a new diet that has specific requirements, or learning how to finally play that guitar.
					MentorMe is the one stop shop place for you. We encourage you to please make a profile, share your interests, and reach out to Mentors around you.
					MentorMe is strategically built to offer a safe environment for individuals looking to find that specific someone to help you reach your goal.
					We invite you to please use responsibly, and consider Mentoring aswell.
				</p>
				<br/>
				<br/>
				<br/>
				<div className="jumbotron questions">
					<h2>Sample Questions</h2>
					<ol>
						<li>What are some good vegan places around here?</li>
						<li>Do you have any tips and tricks to learn surfing?</li>
						<li>I just moved to this city, and love fishing too! What are some good spots in town?</li>
						<li>I own a drone and have been trying to learn how to capture good shots. Mind if you can help out?</li>
						<li>I see you have experience in java. I’m building a simple calculator program and stuck at the moment, do you mind asking you a few questions?</li>
						<li>I’m shooting a movie based locally in this town, what are some places that are famous only to locals?</li>
						<li>I go skydiving as well; can I join on your next mission?</li>
						<li>I’m new in town and as an artist was wondering where are the best places to host a gallery opening?</li>
						<li>I’m new to photography and I see you have a passion for it. What are a few lenses you would recommend starting with?</li>
						<li> I see you love travelling, what road trips would you recommend and how to prepare for them.</li>

					</ol>
				</div>
				<h3>Questions, Comments, Concerns?</h3>
				<h3>Contact us at: </h3>
				<h3>contact@localmentor.me </h3>
			</div>
		);
	}
}
