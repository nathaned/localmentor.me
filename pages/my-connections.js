import React, { Component } from 'react';
import DashboardNav from '../components/user/dashboardNav'
import ConnectionsList from '../components/user/connectionsList'
import Head from '../components/head'
import { getTags } from '../lib/api/user';
import SearchBar from '../components/user/searchBar'
import { checkAuth, searchTags } from '../lib/api/user'



export default class MyConnectionsTest extends Component {
	
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	async loadTags() {
		const tags = await getTags(this.props.baseUrl);
		this.setState({ tags });
	}


	async componentDidMount() {
		// check if the user is logged in
		const user = await checkAuth(this.props.baseUrl);

		// if not logged in, send them to the login page
		// TODO send them to something like /login?redirect=find-a-mentor
		if (!user)
			window.location = '/login';

		this.setState({ user });
		await this.loadTags();
	}

	

	static getInitialProps({ req }) {
		const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
		return { baseUrl };
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
					title="Dashboard" />
				
				<div>
					<DashboardNav
						pageTitle={pageTitle}
						user={this.state.user}
					/>
					<div className="cover-container">
						<div className="jumbotron trans">
							<h1>Connections</h1>
								
								<ConnectionsList
									baseUrl={this.props.baseUrl}
									user={this.state.user} 
									tab = {this.state.tab}
								/>
									
						</div>
					</div>
				</div>
			</div>
		);
	}
}