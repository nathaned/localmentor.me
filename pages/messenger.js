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
		this.state = { messages: [], unreads: [] };
	}

	async componentDidMount() {
		await this.loadContactList();
		this.continuouslyCheckUnreads();
	}


	static async getInitialProps({ req }) {
		const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
		const user = req.session.user;
		const limitedProfile = await getLimitedProfile(baseUrl, user);
		return { limitedProfile, user };
	}

	continuouslyCheckUnreads() {
		setInterval( async () => {
			console.log("checking for new unread messages");
			if (document.hidden) {
				console.log("jk, document is hidden");
				return;
			}
			const unreads = await getUnreads();
			if ( JSON.stringify(this.state.unreads) != JSON.stringify(unreads) ) {
				this.setState({ unreads });
			}
			console.log("unreads: ", unreads);
		}, 2000)
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
							unreads={this.state.unreads}
							user={this.props.user}/>
					)
					: <p>Loading...</p>
				}
				<div className="clear"></div>
			</div>
		)
	}
}
