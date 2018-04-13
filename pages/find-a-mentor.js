import React, { Component } from 'react';
import DashboardNav from '../components/user/dashboardNav'
import Head from '../components/head'
import MentorList from '../components/user/mentorList'
import { getTags } from '../lib/api/user';
import SearchBar from '../components/user/searchBar'
import { checkAuth, searchTags } from '../lib/api/user'

export default class FindAMentor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputSearch: ''
		};
	}
	async loadTags() {
		const tags = await getTags(this.props.baseUrl);
		this.setState({ tags });
	}

	handleChange(e) {
		const value = e.target.value;
		if (e.target.id == "inputSearch")
			this.setState({inputSearch: value});
		else if (e.target.id == "inputPassword")
			this.setState({inputPassword: value});
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

	async handleSearch (tags) {
		console.log("going to search, got tags:", tags);
		const mentors = await searchTags(this.props.baseUrl, tags);
		console.log("got these guys back: ", mentors);
		this.setState({ mentors });
	}


	static getInitialProps({ req }) {
		const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
		return { baseUrl };
	}


	render() {
		const pageTitle = "Find a Mentor";
		return (

			<div>
				<Head
					cssFiles={[
						"dashboard.css",
						"dashboardNav.css",
						"profileCard.css",
						"react-select.min.css",
						"jumbo.css"
					]}
					title="Dashboard" />
				<div className="app-container">
					<div className="site-wrapper">
						<div >
							<div className="cover-container">
							<p></p>
								<DashboardNav
									pageTitle={pageTitle}
									user={this.state.user}
								/>

								<p>&nbsp;</p>
								<p>&nbsp;</p>
								<p>&nbsp;</p>

								<div className="jumbotron trans">
									<h1>Find a Mentor</h1>

									{this.state.tags
										? (
											<SearchBar
												onClick={this.handleSearch.bind(this)}
												tags={this.state.tags} />
										) : null
									}
									{this.state.mentors
										? (
											<MentorList
												mentors={this.state.mentors}
												baseUrl={this.props.baseUrl}
												user={this.state.user} />
										) : null
									}
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
}
