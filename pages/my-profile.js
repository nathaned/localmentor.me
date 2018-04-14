import React, { Component } from 'react';
import Head from '../components/head'
import DashboardNav from '../components/user/dashboardNav'
import Dashboard from '../components/user/dashboard'
import Profile from '../components/user/profile'
import { getLimitedProfile } from '../lib/api/user'

export default class MyProfile extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (!this.props.user)
			window.location = '/login';
	}

	static async getInitialProps({ req }) {
		const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
		const user = req.session.user;
		const limitedProfile = await getLimitedProfile(baseUrl, user);
		return { limitedProfile, user };
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
						md5={this.props.limitedProfile.email}
						pageTitle={pageTitle}
						user={this.props.user}
					/>
					<div className="cover-container">
						<Profile
							user={this.props.user}/>
					</div>
				</div>
			</div>
		)
	}
}
