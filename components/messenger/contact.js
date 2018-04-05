import React, { Component } from 'react';
import Gravatar from 'react-gravatar';

export default class Messenger extends Component {
	constructor(props) {
		super(props);
	}

	renderName() {
		const lenBoth = ("" + this.props.firstName + this.props.lastName).length;
		return (
			<strong>
				{lenBoth > 25
					?  this.props.firstName
					: (this.props.firstName + " " + this.props.lastName)}
			</strong>
		);
	}

	renderTitle() {
		return (<i>{ this.props.username + " | " + this.props.relation }</i>)
	}

	render() {
		console.log(this.props);
		const { firstName, lastName, image, relation, selected, username } = this.props;
		return (
			<div className={ "contact" + (this.props.selected ? " selected" : "") } onClick={this.props.onClick}>
				<Gravatar protocol="https://" email="mathews.kyle@gmail.com" />
				{ this.renderName() } <br/>
				{ this.renderTitle() }
				{ this.props.unread
					? ( <div className="unread-dot">dot</div>
					) : null
				}
			</div>
		);
	}
}
