import React, { Component } from 'react';

export default class DashboardNav extends Component {
	constructor(props) {
		super(props);
	}
	render(props) {
		return (
			<div className="masthead clearfix">
				<div className="inner">
					<h3 className="masthead-brand">MentorMe</h3>
					<nav className="nav nav-masthead">
						<a	href="/find-a-mentor"
							className={"nav-link" + (
								this.props.pageTitle == "Find a Mentor"
									? " active"
									: " "
							)}>
							Find Mentor
						</a>
						<a	href="/my-connections"
							className={"nav-link" + (
								this.props.pageTitle == "My Connections"
									? " active"
									: " "
							)}>
							Connections
						</a>
						<a	href="/messenger"
							className={"nav-link" + (
								this.props.pageTitle == "Messenger"
									? " active"
									: " "
							)}>
							Messenges
						</a>
						<a	href="/my-profile" className={"nav-link" + (
								this.props.pageTitle == "My Profile"
									? " active"
									: " "
							)}>
							Profile
						</a>
					</nav>
				</div>
			</div>
		);
	}
}
