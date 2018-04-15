import React, { Component } from 'react';
import DashboardNav from '../components/user/dashboardNav'
import ConnectionsList from '../components/user/connectionsList'
import Head from '../components/head'
import { getLimitedProfile } from '../lib/api/user'

export default class MyConnectionsTest extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	async loadTags() {
		const tags = await getTags();
		this.setState({ tags });
	}

	async componentDidMount() {
		await this.loadTags();
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

	// async handleAccept (mentee) {
	// console.log("accepting a request ");
	// 	await acceptR(mentee)
	// }

	// async handleIgnore (mentee) {
	// console.log("ignoring a request ");
	// 	await ignoreR(mentee);
	// }

	// async handleBlock (mentee) {
	// console.log("blocking a user ");
	// 	await blockR(mentee);
	// }

	render() {
		const pageTitle = "My Connections";

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
						<ConnectionsList
							user={this.props.user}
							tab = {this.state.tab}
						/>
					</div>
				</div>
				<div className="clear"></div>
			</div>
		);
	}
}
