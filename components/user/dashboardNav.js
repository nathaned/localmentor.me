import React, { Component } from 'react';

export default class DashboardNav extends Component {
	constructor(props) {
		super(props);
		this.state = { showProfileMenu: false };
	}

	toggleProfileMenu() {
		this.setState({ showProfileMenu: !this.state.showProfileMenu });
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
							Messages
						</a>
						<a	href="/my-profile" className={"nav-link" + (
								this.props.pageTitle == "My Profile"
									? " active"
									: " "
							)}>
							My Profile
						</a>
						<div onClick={this.toggleProfileMenu.bind(this)}id="nav-profile">{this.props.user}
							<img src="static/images/download.png"/>
							{ this.state.showProfileMenu
								? (
									<ul>
										<li>
											<a href="/my-profile">My Profile</a>
										</li>
										<li>
											<a href="/logout">Logout</a>
										</li>
									</ul>
							) : null}
						</div>
					</nav>
				</div>
			</div>
		);
	}
}
