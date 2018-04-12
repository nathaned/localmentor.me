import React, { Component } from 'react';

export default class Header extends Component {
	constructor(props) {
		super(props);
	}
	render(props) {
		return (
			<div className="masthead ">
			<div className="inner">
					<nav className="navbar nnavbar-expand-xl navbar-dark bg-dark">
					<img src="../../static/images/network.png" height="42" width="42"/>
						<a	href="/"
							className={"btn btn-dark" + (
								this.props.page == "home"
									? " active"
									: " "
							)}>
							Home
						</a>
						<a	href="/login"
							className={"btn btn-dark" + (
								this.props.page == "login"
									? " active"
									: " "
							)}>
							Sign In
						</a>
						<a	href="/contact"
							className={"btn btn-dark" + (
								this.props.page == "Contact"
									? " active"
									: " "
							)}>
							Contact
						</a>
					</nav>
					</div>
			</div>
		);
	}
}
