import React, { Component } from 'react';
import DashboardNav from '../components/user/dashboardNav'
import Head from '../components/head'
import MentorList from '../components/user/mentorList'
import { getTags } from '../lib/api/user';
import SearchBar from '../components/user/searchBar'
import { searchTags } from '../lib/api/user'

export default class FindAMentor extends Component {
	constructor(props) {
		super(props);
		this.state = { inputSearch: '', tags: [] };
	}
	async loadTags() {
		const tags = await getTags();
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
		if (!this.props.user)
			window.location = '/login';

		await this.loadTags();
	}

	async handleSearch (tags, location) {
		console.log("going to search, got tags:", tags);
		const mentors = await searchTags(tags, location);
		console.log("got these guys back: ", mentors);
		this.setState({ mentors });
	}

	static getInitialProps({ req }) {
		const user = req.session.user;
		return { user };
	}

	render() {
		const pageTitle = "Find a Mentor";
		return (
			<div id="fullpage-container">
				<Head
					cssFiles={[
						"findMentor.css",
						"dashboardNav.css",
						"profileCard.css",
						"react-select.min.css",
						"jumbo.css"
					]}
					title="Dashboard" />
				<div>
					<DashboardNav
						pageTitle={pageTitle}
						user={this.props.user}
					/>
					<div className="cover-container">
						<div className="jumbotron trans">
							<h1>Find a Mentor</h1>

							<SearchBar
								onClick={this.handleSearch.bind(this)}
								tags={this.state.tags} />

							{this.state.mentors
								? (
									<MentorList
										mentors={this.state.mentors}
										user={this.props.user} />
								) : null
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
