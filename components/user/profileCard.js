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

	// This currently isnt working
	toggleExpanded(){
		this.setState({expanded: !this.state.expanded});

	}

	renderActionButton() {
		return (
			<button className="btn btn-primary" onClick={() => this.toggleExpanded()}>
				{"MENTOR ME"}
			</button>
		)
	}

	renderExpandedProfile() {
		const {
			email,
			firstName,
			lastName,
			location,
			bio,
			tags,
			rating500,
			numRatings
		} = this.props;

		return (
			<div className="profileCard" onClick={this.props.onClick}>
				<div className="profle-picture">
					<Gravatar protocol="https://" email={email} />
				</div>
				<div className="profile-content">
					{ firstName + lastName } <br/>
					{ this.renderActionButton() }
				</div>
			</div>
		);
	}

	renderShortProfile() {
		const {
			email,
			firstName,
			lastName,
			location,
			tags,
			bio
		} = this.props;

		return (
			<div className="profileCard">

				<Gravatar protocol="https://" email={email} />
				{ " " + firstName + " " + lastName + " Location: " + location + " " }
				<p></p>

			</div>
		);
	}
	
	
	renderConnectionsProfile() {
		const {
			email,
			firstName,
			lastName,
			location,
			tags,
			bio
		} = this.props;

		return (
			<div className="profileCard">

				<Gravatar protocol="https://" email={email} />
				{ " " + firstName + " " + lastName + " Location: " + location + " " }
				<p></p>

			</div>
		);
	}
}
