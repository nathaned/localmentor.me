import React, { Component } from 'react';
import Message from './message';

export default class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = { inputText: "" };
	}

	renderMessages() {
		if (!this.props.messages) return null;
		let previousSender = false;
		const selectedUsername = this.props.contact.username;
		const renderedMessages = (
			this.props.messages.map( (message, i) => {
				const showName = (previousSender != message.sender);
				console.log(message);
				previousSender = message.sender;
				const type = (message.sender == selectedUsername) ? "received" : "sent"
				return (
					<Message
						sender={message.sender}
						key={message.text + i}
						showName={showName}
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
		this.setState({ inputText: '' })

	}

	onKeyDown(e) {
		if(e.keyCode == 13 && e.shiftKey == false) {
			e.preventDefault();
			this.sendMessage();
		}
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
						placeholder={"Message " + this.props.contact.firstName}
						value={this.state.inputText}
						onChange={this.handleChange.bind(this)}
						onKeyDown={this.onKeyDown.bind(this)}>
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
