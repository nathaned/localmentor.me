import React, { Component } from 'react';
import DashboardNav from '../components/user/dashboardNav'
import Head from '../components/head'
import MentorList from '../components/user/mentorList'
import SearchBar from '../components/user/searchBar'
import { checkAuth } from '../lib/api/user'

export default class FindAMentor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputSearch: ''
		};
	}

	async sendSearch(id, query) {

		const body = JSON.stringify({ query, id });
		const headers = { 'Content-Type': 'application/json' };
		const url = this.props.baseUrl + '/api/mentor-list';
		const response = await fetch(
			url,
			{ method: "POST", body, headers }
		);
		const res = await response.json();
		// note that if we do just `query`, it's shorthand for `query: query`
		this.setState({ mentors: res.list, query });
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
	}



	testButton()
	{
		this.sendSearch(0, "someOtherQuery");
	}


	static getInitialProps({ req }) {
		const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
		return { baseUrl };
	}


	render() {
		const pageTitle = "Find a Mentor";
		return (
			<div>
				<Head title="Dashboard" cssFiles={ ["dashboard.css", "dashboardNav.css"] }/>
				<div className="app-container">
					<div className="site-wrapper">
						<div className="site-wrapper-inner">
							<div className="cover-container">

								<DashboardNav
									pageTitle={pageTitle}
									user={this.state.user}
								/>

								<div id = "whaterver-you-want-to-call-that-id">
									FIND A MENTOR
								</div>

								<div className="search-bar" >
									<input type="text" id="inputSearch" className="form-control" placeholder="Search for a Mentor" value={this.state.inputSearch} onChange={this.handleChange.bind(this)} required autoFocus/>

									<button className="btn btn-primary" onClick={() => this.testButon()}>
									{"MENTOR ME"}
									</button>

									<p></p>
									<p></p>
								</div>

								<div className="mentor-list" id="test">
									<MentorList
										baseUrl={this.props.baseUrl}
										user={this.state.user}/>
								</div>

							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
}
