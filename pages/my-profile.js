import React, { Component } from 'react';
import Head from '../components/head'
import DashboardNav from '../components/user/dashboardNav'
import Dashboard from '../components/user/dashboard'
import Profile from '../components/user/profile'
import { checkAuth } from '../lib/api/user'

export default class MyProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		// check if the user is logged in
		const user = await checkAuth(this.props.baseUrl);

		// if not logged in, send them to the login page
		// TODO send them to something like /login?redirect=find-a-mentor
		if (!user)
			window.location = '/login';

		this.setState({ user });
	}

	static getInitialProps({ req }) {
		const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
		return { baseUrl };
	}

	render () {
		const pageTitle = "My Profile";
		return (
			<div>
				<Head
					cssFiles={[
						"dashboardNav.css",
						"profile.css",
						"profileCard.css",
						"nprogress.css",
						"react-select.min.css"
					]}
					title={pageTitle} />
				<div className="app-container">
					<div className="site-wrapper">
						<div className="site-wrapper-inner">
							<div className="cover-container">
								<DashboardNav pageTitle={pageTitle}/>
								<div>
								<p>&nbsp;</p>
								<p>&nbsp;</p>
								</div>
								<Profile
									baseUrl={this.props.baseUrl}
									user={this.state.user}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
