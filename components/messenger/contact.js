import React, { Component } from 'react';

export default class Messenger extends Component {
	constructor(props) {
		super(props);
	}

	renderName() {
		return (<strong>FirstName LastName</strong>);
		const lengthBoth = ("" + this.props.firstName + this.props.lastName);
		return (
			<strong>
				{lengthBoth > 25
					?  this.props.firstName
					: this.props.firstName + this.props.lastName}
			</strong>
		);
	}

	renderTitle() {
		return (<i>{ "funkyUserName  |  Mentor" }</i>)
	}

	render() {
		console.log(this.props);
		const { firstName, lastName, image, relation, selected, username } = this.props;
		return (
			<div className="contact" onClick={this.props.onClick}>
			 	<img src="static/images/download.png" />
				{ this.renderName() } <br/>
				{ this.renderTitle() }
			</div>
		);
	}
}
