import React, { Component } from 'react';

class Header extends Component {
	constructor(props) {
		super(props);
	}
	render(props) {
		return (
			<div className="masthead clearfix">
				<div className="inner">
					<h3 className="masthead-brand">Cover</h3>
					<nav className="nav nav-masthead">
						<a	href="/find-a-mentor"
							className={"nav-link" + (
								this.props.pageTitle == "Find a Mentor"
									? " active"
									: " "
							)}>
							Find a Mentor
						</a>
						<a	href="/my-connections"
							className={"nav-link" + (
								this.props.pageTitle == "My Connections"
									? " active"
									: " "
							)}>
							My Connections
						</a>
						<a	href="/messenger"
							className={"nav-link" + (
								this.props.pageTitle == "Messenger"
									? " active"
									: " "
							)}>
							Messenger
						</a>
						<a	href="/my-profile"
							className={"nav-link" + (
								this.props.pageTitle == "My Profile"
									? " active"
									: " "
							)}>
							My Profile
						</a>
					</nav>
				</div>
			</div>
		);
	}
}

export default Header;
