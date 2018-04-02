import React, { Component } from 'react';
import Contact from './contact'
import Chat from './chat'

export default class Messenger extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderContacts() {
		console.log(this.props.contactList);
		return (
			this.props.contactList.map( (contact, i) => {
				return (
					<Contact
						key={i}
						firstName={contact.firstName}
						lastName={contact.lastName}
						onClick={this.selectContact.bind(this, i)}
						pic={contact.pic}
						relation={contact.relation}
						username={contact.username}
						selected={contact.username == this.state.contact}
					/>
				);
			})
		)
	}

	selectContact(index) {
		console.log("index: " + index);
		this.setState({ contact: this.props.contactList[index] })
	}

	componentDidMount() {
		const currHash = window.location.hash;
		this.setContact(currHash.slice(1));
		// todo should it listen to hash change or just read it once?
	}

	setContact(contact) {
		console.log(this.props.contactList);
		if (this.props.contactList && this.props.contactList.indexOf(contact) != -1) {
			this.setState({ contact });
			window.location.hash = contact;
		}
		else {
			console.log("contact not found");
			this.setState({ contact: null })
			window.location.hash = '';
		}
	}


	render() {
		console.log(this.state);
		return (
			<div className="inner cover">
				<div id="messenger-container">
					<div id="contacts-container">
						{ this.renderContacts() }
					</div>
					<div id="chat-container">
						{ this.state.contact
							? <Chat contact={this.state.contact}/>
							: <p>Select someone to chat.</p>
						}
					</div>
				</div>
			</div>
		);
	}
}
