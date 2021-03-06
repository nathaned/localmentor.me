import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
import { getProfile } from '../../lib/api/user';

export default class DashboardNav extends Component {
	constructor(props) {
		super(props);
		this.state = { showProfileMenu: false, showDropdown: false };
	}

	toggleProfileMenu() {
		this.setState({ showProfileMenu: !this.state.showProfileMenu });
	}

	toggleDropdown() {
		this.setState({ showDropdown: !this.state.showDropdown });
	}

	render(props) {
		const { showDropdown, showProfileMenu } = this.state;
		const { md5, pageTitle, user } = this.props;
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<a className="navbar-brand" href="/"><img src="../../static/images/network.png" height="42" width="42" /></a>
				<button className="navbar-toggler" type="button" data-target="#navbarSupportedContent" onClick={this.toggleDropdown.bind(this)}>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className={"navbar-collapse " + (showDropdown ? "" : "collapse")} id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<a className={"nav-link " + (pageTitle == "Find a Mentor" ? "active" : "")} href="/find-a-mentor">
								Find a Mentor
							</a>
						</li>
						<li className="nav-item">
							<a className={"nav-link " + (pageTitle == "My Connections" ? "active" : "")} href="/my-connections">
								My Connections
							</a>
						</li>
						<li className="nav-item">
							<a className={"nav-link " + (pageTitle == "Messenger" ? "active" : "")} href="/messenger">
								Messenger
							</a>
						</li>
					</ul>
					<div id="profile-dropdown" className={"dropdown " + (showProfileMenu ? "show" : "")}>
						<a className="nav-link dropdown-toggle" role="button" onClick={this.toggleProfileMenu.bind(this)}>
							<Gravatar id="navbar-gravatar" size={30} protocol="https://" md5={md5} />
							{user}
						</a>
						<div className={"dropdown-menu " + (showProfileMenu ? "show" : "")} aria-labelledby="navbarDropdown">
							<a className="dropdown-item" href="/my-profile">My Profile</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="/logout">Logout</a>
						</div>
					</div>
				</div>
				{ showProfileMenu
					? (
						<div id="fill-page" onClick={this.toggleProfileMenu.bind(this)}>
							a
						</div>
					): null
				}
			</nav>
		);
	}
}
