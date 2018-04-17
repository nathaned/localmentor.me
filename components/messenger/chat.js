import React, { Component } from 'react';
import Message from './message';
import timeago from 'timeago.js';

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
				previousSender = message.sender;
				const type = (message.sender == selectedUsername) ? "received" : "sent";
				const date = timeago().format(new Date(message.date));
				console.log(date);
				return (
					<Message
						key={message.text + i}
						date={date}
						sender={message.sender}
						showName={showName}
						type={type}
						text={message.text}/>
				);
			})
		);

		return (
			<ul>
				{ renderedMessages }
				<div className="fake-bottom" ref={(el) => { this.messagesEnd = el; }}></div>
			</ul>
		);
	}

	handleChange(e) {
		const inputText = e.target.value;
		this.setState({ inputText });
	}

	async sendMessage() {
		const message = this.state.inputText;
		this.props.sendMessage(message);
		this.setState({ inputText: '' })
		await this.props.update();
	}

	onKeyDown(e) {
		if(e.keyCode == 13 && e.shiftKey == false) {
			e.preventDefault();
			this.sendMessage();
		}
	}

	scrollToBottom () {
		this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	render() {
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
