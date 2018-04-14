import React, { Component } from 'react';
import Head from '../components/head'
import DashboardNav from '../components/user/dashboardNav'
import Dashboard from '../components/user/dashboard'
import Profile from '../components/user/profile'

export default class MyProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		if (!this.props.user)
			window.location = '/login';
	}

	static getInitialProps({ req }) {
		const user = req.session.user;
		return { user };
	}

	render () {
		const pageTitle = "My Profile";
		return (
			<div id="fullpage-container">
				<Head
					cssFiles={[
						"dashboardNav.css",
						"profile.css",
						"profileCard.css",
						"nprogress.css",
						"react-select.min.css"
					]}
					title={pageTitle} />
				<div>
					<DashboardNav
						pageTitle={pageTitle}
						user={this.state.user}
					/>
					<div className="cover-container">
						<Profile
							user={this.state.user}/>
					</div>
				</div>
			</div>
		)
	}
}
