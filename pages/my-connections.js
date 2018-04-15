import React, { Component } from 'react';
import DashboardNav from '../components/user/dashboardNav'
import ConnectionsList from '../components/user/connectionsList'
import Head from '../components/head'
import { getTags } from '../lib/api/user';
import SearchBar from '../components/user/searchBar'
import { getLimitedProfile, searchTags } from '../lib/api/user'

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
		if (!this.props.user)
			window.location = '/login';
		await this.loadTags();
	}

	static async getInitialProps({ req }) {
		const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
		const user = req.session.user;
		const limitedProfile = await getLimitedProfile(baseUrl, user);
		return { limitedProfile, user };
	}

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
