import React, { Component } from 'react';
import Head from '../components/head'
import DashboardNav from '../components/user/dashboardNav'
import Dashboard from '../components/user/dashboard'
import Footer from '../components/footer'
import Messenger from '../components/user/messenger'

export default class MessengerPage extends Component {
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
		const pageTitle = "Messenger";
		return (
			<div>
				<Head title={pageTitle} cssFiles={ ["dashboardNav.css", "messenger.css"] }/>
				<div className="app-container">
					<div className="site-wrapper">
						<div className="site-wrapper-inner">
							<div className="cover-container">
								<DashboardNav pageTitle={pageTitle}/>
								<Messenger
									baseUrl={this.props.baseUrl}
									user={this.state.user}/>
								<Footer />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
