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
					<nav className="navbar nnavbar-expand-xl navbar-dark bg-dark">
					<img src="../../static/images/network.png" height="42" width="42"/>
						<a	href="/find-a-mentor"
							className={"btn btn-dark" + (
								this.props.pageTitle == "Find a Mentor"
									? " active"
									: " "
							)}>
							Find Mentor
						</a>
						<a	href="/my-connections"
							className={"btn btn-dark" + (
								this.props.pageTitle == "My Connections"
									? " active"
									: " "
							)}>
							Connections
						</a>
						<a	href="/messenger"
							className={"btn btn-dark" + (
								this.props.pageTitle == "Messenger"
									? " active"
									: " "
							)}>
							Messages
						</a>

						<div className="dropdown">
						<button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<img src="../../static/images/user.png" height="42" width="42"/>
						</button>
						<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
							<a className="dropdown-item" href="/my-profile">Profile</a>
							<a className="dropdown-item" href="/logout">Logout</a>
						</div>
						</div>
					</nav>
				</div>
			</div>
		);
	}
}
