import React, { Component } from 'react';

export default class Messenger extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderContacts() {
		return (
			<p>Contact</p>
		)
	}

	render() {
		return (
			<div className="inner cover">
				<div id="messenger-container">
					<div id="contacts-container">
						{ this.renderContacts() }
					</div>
					<div id="chat-contianer">
						{ this.state.contact
							? <p>Mesages go here.</p>
							: <p>Select someone to chat.</p>
						}
					</div>
				</div>
			</div>
		);
	}
}
