import React, { Component } from 'react';
import Message from './message'

export default class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderMessages() {
		return (
			<ul>
				<Message
					text="hiac"
					type="sent"/>
				<Message
					text="height: 100%;margin-left: 325px; width: auto; background: rgba(9, 200, 9, .25); color: black; text-shadow: none;height: 100%; margin-left: 325px; width: auto; background: rgba(9, 200, 9, .25); color: black; text-shadow: none;"
					type="received"/>
				<Message
					text="background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);background: rgba(9, 200, 9, .25);"
					type="sent"/>

			</ul>
		);
	}

	render() {
		console.log(this.props);
		return (
			<div id="chat">
				<div id="message-list">
					{ this.renderMessages() }
				</div>
				<div id="chat-input">
					<textarea placeholder={"Message " + this.props.contact}></textarea>
					<input id="send-button" className="btn btn-primary " value="Send" readOnly/>
				</div>
			</div>
		);
	}
}
