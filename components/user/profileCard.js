import React, { Component } from 'react';
import Gravatar from 'react-gravatar';

export default class ProfileCard extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			this.props.expanded
				? this.renderExpandedProfile()
				: this.renderShortProfile()

		);
	}

	renderActionButton() {
		return (
			<p>{this.props.action}</p>
		)
	}

	renderExpandedProfile() {
		return (
			<div className="profileCard" onClick={this.props.onClick}>
				<div className="profle-picture">
					<Gravatar protocol="https://" email={this.props.email} />
				</div>
				<div className="profile-content">
					{ this.props.firstName + this.props.lastName } <br/>
					{ this.props.title }
					{ this.renderActionButton() }
				</div>
				
				
				
			</div>
		);
	}

	renderShortProfile() {
		return (
			<div className="profileCard">
				<Gravatar protocol="https://" email="mathews.kyle@gmail.com" />
				{ " " + this.props.firstName + " " + this.props.lastName + " Distance: " + this.props.distanceAway } <br/>
				{ this.props.title }
				
				
			</div>
		);
	}
}
