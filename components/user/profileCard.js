import React, { Component } from 'react';
import Gravatar from 'react-gravatar';

export default class ProfileCard extends Component {
	constructor(props) {
		super(props);
		this.state = { expanded: true };
	}

	render() {
		switch (this.props.type) {
			case "search":
				return this.renderSearchProfile();
			case "request":
				return this.renderRequestProfile();
			case "connectedMentor":
				return this.renderConnectedMenteeProfile();
			case "connectedMentee":
				return this.renderConnectedMenteeProfile();
			default:
				return this.renderShortProfile();
		}
	}

	requestMentor(){
		// API call to accept mentor
	}

	acceptMentor(){
		// API call to accept mentor
	}

	ignoreMentor(){
		// API call to ignore mentor
	}

	messageMentor(){
		// API call to message mentor
	}

	blockMentor(){
		// API call to ignore mentor
	}

	endMentor(){
		// API call to end mentor
	}

	renderRequestButton() {
		return (
			<button id = "requestButton" className="btn btn-primary" onClick={() => RequestMentor()}>
				MENTOR ME
			</button>
		)
	}

	renderAcceptButton() {
		return (
			<button id = "acceptButton" className="btn btn-primary" onClick={() => this.acceptMentor()}>
				Accept
			</button>
		)
	}

	renderIgnoreButton() {
		return (
			<button id = "ignoreButton" className="btn btn-primary" onClick={() => this.ignoreMentor()}>
				Ignore
			</button>
		)
	}

	renderMessageButton() {
		return (
			<button id = "ignoreButton" className="btn btn-primary" onClick={() => this.ignoreMentor()}>
				Message
			</button>
		)
	}

	renderBlockButton() {
		return (
			<button id = "ignoreButton" className="btn btn-primary" onClick={() => this.ignoreMentor()}>
				Block
			</button>
		)
	}

	renderEndButton() {
		return (
			<button id = "endButton" className="btn btn-primary" onClick={() => this.endMentor()}>
				End
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
				<div className="profile-picture">
					<Gravatar protocol="https://" email={email} />
				</div>
				<div className="profile-content">
					{ firstName + lastName } <br/>
					{ this.renderRequestButton() }
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
				<div className="profile-picture">
					<Gravatar size={100} protocol="https://" email={email} />
				</div>
				<div className="profile-content">
					{ firstName + lastName } <br/>
					{this.renderRequestButton()}
				</div>
			</div>
		);
	}

	renderConnectionsProfile() {
		const {
			email,
			firstName,
			lastName,
			location,
			bio,
			tags,
			rating500,
			numRatings,
			distanceAway
		} = this.props;

		return (
			<div className="jumbotron cards"  >
				<div className="profile-picture">
					<Gravatar protocol="https://" email={email} />
				</div>
				<div className="profile-content">
					<div className="name">
						{ firstName + lastName } <br/>
					</div>

					<Gravatar protocol="https://" email={email} />

					<div className="bio">
						{ bio } <br/>
					</div>

					<div className="tags">
						{ tags } <br/>
					</div>

					<div className="rating">
						{ rating500 } <br/>
					</div>

					<div className="distance">
						{ location + " place" } <br/>
					</div>

					<div className="buttons">
						{ this.renderAcceptButton() }
						{ this.renderIgnoreButton() }
						{ this.renderBlockButton() }
					</div>

				</div>
			</div>
		);
	}

	renderConnectedProfile() {
		const {
			email,
			firstName,
			lastName,
			location,
			bio,
			tags,
			rating500,
			numRatings,
			distanceAway
		} = this.props;

		return (
			<div className="jumbotron cards"  >
				<div className="profile-picture">
					<Gravatar protocol="https://" email={email} />
				</div>
				<div className="profile-content">
					<div className="name">
						{ firstName + lastName } <br/>
					</div>

					<Gravatar protocol="https://" email={email} />

					<div className="bio">
						{ bio } <br/>
					</div>

					<div className="tags">
						{ tags } <br/>
					</div>

					<div className="rating">
						{ rating500 } <br/>
					</div>

					<div className="location">
						{ location + " place" } <br/>
					</div>

					<div className="buttons">
						{ this.renderMessageButton() }
						{ this.renderBlockButton() }
						{ this.renderEndButton() }
					</div>

				</div>
			</div>
		);
	}
}
