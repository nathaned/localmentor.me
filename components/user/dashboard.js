import React, { Component } from 'react';

class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="inner cover">
				<h1 className="cover-heading">{this.props.pageTitle}</h1>
				<p className="lead">This is the dashboard. You'll see this page when you're logged in.</p>
			</div>
		);
	}
}

export default Dashboard;
