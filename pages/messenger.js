import React, { Component } from 'react';
import Head from '../components/head'
import DashboardNav from '../components/user/dashboardNav'
import Dashboard from '../components/user/dashboard'
import Messenger from '../components/messenger/messenger'
import { checkAuth } from '../lib/api/user'
import { getContactList } from '../lib/api/messages'

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
		await this.getContactList();
	}

	static async getInitialProps({ req }) {
		const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
		return { baseUrl };
	}

	async getContactList() {
		console.log("baseurl: " + this.props.baseUrl);
		console.log("hello123");
		const contactList = await getContactList(this.props.baseUrl);
		if (!contactList) {
			this.setState({ contactList: [] });
		}
		else {
			this.setState({ contactList });
		}
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
								{ this.state.contactList
									? (
										<Messenger
											baseUrl={this.props.baseUrl}
											contactList={this.state.contactList}
											user={this.state.user}/>
									)
									: <p>Loading...</p>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
