import React, { Component } from 'react';
import DashboardNav from '../components/user/dashboardNav'
import ConnectionsList from '../components/user/connectionsList'
import Head from '../components/head'
import { getConnectionProfile, getLimitedProfile } from '../lib/api/user'

export default class MyConnectionsTest extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		await this.refresh();
	}

	async refresh() {
		console.log("refresh method run");
		await this.loadConnectionProfile();
	}

	async loadConnectionProfile() {
		const profile = await getConnectionProfile();
		console.log("profile: ", profile);
		this.setState({ profile });
	}

	static async getInitialProps({ req, res }) {
		const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
		const user = req.session.user;
		if (!user && res) { // if the user isn't logged in, send them to login
			res.writeHead(302, { Location: '/login' });
			res.end();
			res.finished = true;
		}
		const limitedProfile = await getLimitedProfile(baseUrl, user);
		return { limitedProfile, user };
	}

	render() {
		const pageTitle = "My Connections";
		const profile = this.state.profile;

		return (
			<div id="fullpage-container">
				<Head
					cssFiles={[
						"connections.css",
						"dashboardNav.css",
						"profileCard.css",
						"react-select.min.css",
						"jumbo.css"
					]}
					title={pageTitle} />

				<DashboardNav
					pageTitle={pageTitle}
					user={this.props.user}
					md5={this.props.limitedProfile.email}
				/>

				<div className="cover-container">
					<div className="jumbotron trans">
						<h1>Connections</h1>
						{ this.state.profile ? (
							<ConnectionsList
								isMentor={this.props.limitedProfile.isMentor}
								isMentee={this.props.limitedProfile.isMentee}
								mentors={profile.mentors}
								mentees={profile.mentees}
								refresh={this.refresh.bind(this)}
								requestedMentors={profile.requestedMentors}
								requestedMentees={profile.requestedMentees}
								user={this.props.user}
							/>
						) : null }
					</div>
				</div>
				<div className="clear"></div>
			</div>
		);
	}
}
