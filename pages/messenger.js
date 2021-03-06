import React, { Component } from 'react';
import Head from '../components/head'
import DashboardNav from '../components/user/dashboardNav'
import Dashboard from '../components/user/dashboard'
import Messenger from '../components/messenger/messenger'
import { getContactList, getUnreads } from '../lib/api/messages'
import { getLimitedProfile } from '../lib/api/user'

export default class MessengerPage extends Component {
	constructor(props) {
		super(props);
		this.state = { messages: [] };
	}

	async componentDidMount() {
		await this.loadContactList();
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

	async loadContactList() {
		const contactList = await getContactList();
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
			<div id="fullpage-container">
				<Head title={pageTitle} cssFiles={ ["dashboardNav.css", "messenger.css"] }/>
				<DashboardNav
					pageTitle={pageTitle}
					user={this.props.user}
					md5={this.props.limitedProfile.email}
				/>
				{ this.state.contactList
					? (
						<Messenger
							contactList={this.state.contactList}
							messages={this.state.messages}
							user={this.props.user}/>
					)
					: <p>Loading...</p>
				}
				<div className="clear"></div>
			</div>
		)
	}
}
