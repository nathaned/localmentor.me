import React, { Component } from 'react';

export default class Homepage extends Component {
	render() {
		return (
			<div className="inner cover">
				<div className="jumbotron trans">
					<h1 className="cover-heading">Welcome to MentorMe.</h1>
					<p className="lead">Register and find yourself a mentor to start learning.</p>
					<p className="lead">
						<a href="/register" className="btn btn-lg btn-success">Register</a>
						</p>
					</div>
				</div>
		);
	}
}
