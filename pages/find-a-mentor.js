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
	
	handleChange(e) {
		if (e.target.id == "inputSearch")
			this.setState({inputSearch: e.target.value});
		else if (e.target.id == "inputPassword")
			this.setState({inputPassword: e.target.value});
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
								
								<div className="search-bar">
									<input type="text" id="inputSearch" className="form-control" placeholder="Search for a Mentor" value={this.state.inputSearch} onChange={this.handleChange.bind(this)} required autoFocus/>
								</div>
								
								<div className="mentor-list">
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
