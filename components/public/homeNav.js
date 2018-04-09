import React, { Component } from 'react';

export default class Header extends Component {
	constructor(props) {
		super(props);
	}
	render(props) {
		return (
			<div className="masthead ">
					<nav className="navbar nnavbar-expand-xl navbar-dark bg-primary">
						<a	href="/"
							className={"btn btn-primary" + (
								this.props.page == "home"
									? " active"
									: " "
							)}>
							Home
						</a>
						<a	href="/login"
							className={"btn btn-primary" + (
								this.props.page == "login"
									? " active"
									: " "
							)}>
							Sign In
						</a>
						<a	href="/contact"
							className={"btn btn-primary" + (
								this.props.page == "Contact"
									? " active"
									: " "
							)}>
							Contact
						</a>
					</nav>
			</div>
		);
	}
}
