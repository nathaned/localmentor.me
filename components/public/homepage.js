import React, { Component } from 'react';

export default class Homepage extends Component {
	render() {
		return (
			<div className="inner cover">
				<h1 className="cover-heading">Welcome to MentorMe.</h1>
				<p className="lead">Register and find yourself a mentor to start learning.</p>
				<p className="lead">
					<a href="#" className="btn btn-lg btn-secondary">Register</a>
				</p>
			</div>
		);
	}
}
