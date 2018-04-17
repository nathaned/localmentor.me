import React, { Component } from 'react';
import Contact from './contact';
import Chat from './chat';
import {
	sendMessage,
	getMessagesWithUser,
	getUnreads
} from '../../lib/api/messages';

export default class Messenger extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	continuouslyCheckUnreads() {
		// this is a really bad way of doing this but it works
		if (this.state.interval) {
			clearInterval(this.state.interval);
		}
		const interval = setInterval( async () => {
			console.log("checking for new unread messages");
			if (document.hidden) { // pretend to be efficient
				console.log("jk, document is hidden");
				return;
			}
			const unreads = await getUnreads();
			if ( JSON.stringify(this.state.unreads) != JSON.stringify(unreads) ) {
				const contact = this.state.contact;
				if (contact && unreads.indexOf(contact.username) != -1) {
					await this.update();
				}
				this.setState({ unreads });
			}
			console.log("unreads: ", unreads);
		}, 200);
		// we can track this interval so they don't pile up
		this.setState({ interval });
	}

	async fetchMessages(contact) {
		console.log("fetching messages in chat");
		if (!contact) {
			console.log("no contact selected", contact);
			return;
		}
		const messages = await getMessagesWithUser(contact.username);
		console.log("fetched messages: ", messages);
		return messages;
	}

	renderContacts() {
		const unreads = this.state.unreads || [];
		const selectedUsername = (
			this.state.contact ? this.state.contact.username : null
		);
		return (
			this.props.contactList.map( (contact, i) => {
				const unread = unreads.indexOf(contact.username) != -1;
				return (
					<Contact
						key={contact.username}
						email={contact.email}
						username={contact.username}
						firstName={contact.firstName}
						lastName={contact.lastName}
						onClick={this.selectContact.bind(this, i)}
						relation={contact.relation}
						selected={contact.username == selectedUsername}
						unread={unread}
					/>
				);
			})
		)
	}

	handleMessage(text) {
		console.log("going to send message with text: ", text);
		sendMessage(this.state.contact.username, text);
	}

	async selectContact(index) {
		console.log("index: " + index);
		const contact = this.props.contactList[index];
		const messages = await this.fetchMessages(contact);
		this.setState({ contact, messages });
	}

	async componentDidMount() {
		const currHash = window.location.hash;
		await this.setInitialContact(currHash.slice(1));
		this.continuouslyCheckUnreads();
		// todo should it listen to hash change or just read it once?
	}

	async setInitialContact(contact) {
		const contactList = this.props.contactList;
		if (contactList && contactList.indexOf(contact) != -1) {
			this.setState({ messages: [] });
			this.setState({ contact });
			window.location.hash = contact;
			await this.fetchMessages();
		}
		else {
			console.log("contact not found");
			this.setState({ contact: null })
			window.location.hash = '';
		}
	}

	async update() {
		console.log("calling update");
		const contact = this.state.contact;
		const messages = await this.fetchMessages(contact);
		console.log("in update, got these messages: ", contact);
		this.setState({ messages });
	}


	render() {
		console.log("messenger.js state", this.state);
		return (
			<div className="inner cover">
				<div id="messenger-container">
					<div id="contacts-container">
						{ this.renderContacts() }
					</div>
					<div id="chat-container">
						{ this.state.contact && this.state.messages
							? <Chat
								contact={this.state.contact}
								messages={this.state.messages}
								sendMessage={this.handleMessage.bind(this)}
								update={this.update.bind(this)}/>
							: <div id="chat-noselection">Select someone to chat.</div>
						}
					</div>
				</div>
			</div>
		);
	}
}
