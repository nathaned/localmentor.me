import React, { Component } from 'react';

export default class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onClick() {

	}

	render() {
		console.log(this.props);
		return (
			<div className="chat">
				<img src="static/images/download.png" />
				{ "FirstName" + this.props.firstName }
			</div>
		);
	}
}
