import React, { Component } from 'react';
import Contact from './contact';
import Chat from './chat';
import { sendMessage, getMessagesWithUser } from '../../lib/api/messages';

export default class Messenger extends Component {
	constructor(props) {
		super(props);
		this.state = { };
	}

	async fetchMessages(contact) {
		const baseUrl = this.props.baseUrl;
		console.log("fetching messages in chat");
		if (!contact) {
			console.log("no contact selected", contact);
			return;
		}
		const messages = await getMessagesWithUser(baseUrl, contact.username);
		console.log("fetched messages: ", messages);
		return messages;
	}

	renderContacts() {
		const unreads = this.props.unreads || [];
		const selectedUsername = (
			this.state.contact ? this.state.contact.username : null
		);
		return (
			this.props.contactList.map( (contact, i) => {
				const unread = unreads.indexOf(contact.username) != -1;
				return (
					<Contact
						key={contact.username}
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
		sendMessage(this.props.baseUrl, this.state.contact.username, text);
	}

	async selectContact(index) {
		console.log("index: " + index);
		const contact = this.props.contactList[index];
		const messages = await this.fetchMessages(contact);
		this.setState({ contact, messages });
	}

	async componentDidMount() {
		const currHash = window.location.hash;
		await this.setContact(currHash.slice(1));
		// todo should it listen to hash change or just read it once?
	}

	async setContact(contact) {
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
								baseUrl={this.props.baseUrl}
								contact={this.state.contact}
								messages={this.state.messages}
								sendMessage={this.handleMessage.bind(this)}/>
							: <p>Select someone to chat.</p>
						}
					</div>
				</div>
			</div>
		);
	}
}
