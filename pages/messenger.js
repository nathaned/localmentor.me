import React, { Component } from 'react';
import Head from '../components/head'
import DashboardNav from '../components/user/dashboardNav'
import Dashboard from '../components/user/dashboard'
import Messenger from '../components/messenger/messenger'
import { checkAuth } from '../lib/api/user'
import { getContactList, getUnreads } from '../lib/api/messages'

export default class MessengerPage extends Component {
	constructor(props) {
		super(props);
		this.state = { messages: [], unreads: [] };
	}

	async componentDidMount() {
		// check if the user is logged in
		const user = await checkAuth(this.props.baseUrl);

		// if not logged in, send them to the login page
		// TODO send them to something like /login?redirect=find-a-mentor
		if (!user)
			window.location = '/login';

		this.setState({ user });
		await this.loadContactList();
		this.continuouslyCheckUnreads();
	}


	static async getInitialProps({ req }) {
		const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
		return { baseUrl };
	}

	continuouslyCheckUnreads() {
		setInterval( async () => {
			console.log("checking for new unread messages");
			if (document.hidden) {
				console.log("jk, document is hidden");
				return;
			}
			const unreads = await getUnreads(this.props.baseUrl);
			if ( JSON.stringify(this.state.unreads) != JSON.stringify(unreads) ) {
				this.setState({ unreads });
			}
			console.log("unreads: ", unreads);
		}, 2000)
	}

	async loadContactList() {
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
											messages={this.state.messages}
											unreads={this.state.unreads}
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
