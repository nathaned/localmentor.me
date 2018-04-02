import React, { Component } from 'react';

export default class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderMessages() {
		return (
			<strong>hi</strong>
		);
	}

	render() {
		console.log(this.props);
		return (
			<div className="chat">
				<div id="message-list">
					{ this.renderMessages() }
				</div>
				<div id="chat-input">
					<input type="text" placeholder={"Message " + this.props.contact}/>
					<p>Send</p>
				</div>
				{ "FirstName" + this.props.firstName }
			</div>
		);
	}
}
