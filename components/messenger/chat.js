import React, { Component } from 'react';
import Message from './message';

export default class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = { inputText: "" };
	}

	renderMessages() {
		if (!this.props.messages) return null;
		const selectedUsername = this.props.contact.username;
		const renderedMessages = (
			this.props.messages.map( (message) => {
			const type = (message.from == selectedUsername) ? "received" : "sent"
				return (
					<Message
						key={message.text}
						type={type}
						text={message.text}/>
				);
			})
		);

		return (
			<ul>
				{ renderedMessages }
			</ul>
		);
	}

	handleChange(e) {
		const inputText = e.target.value;
		this.setState({ inputText });
	}

	sendMessage() {
		const message = this.state.inputText;
		this.props.sendMessage(message);
	}


	render() {
		console.log(this.props);
		return (
			<div id="chat">
				<div id="message-list">
					{ this.renderMessages() }
				</div>
				<div id="chat-input">
					<textarea
						placeholder={"Message " + this.props.contact}
						value={this.state.inputText}
						onChange={this.handleChange.bind(this)}>
					</textarea>
					<input
						id="send-button"
						onClick={this.sendMessage.bind(this)}
						className="btn btn-primary "
						value="Send"
						readOnly />
				</div>
			</div>
		);
	}
}
