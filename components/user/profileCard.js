import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
import { sendRequest } from '../../lib/api/user';

export default class ProfileCard extends Component {
	constructor(props) {
		super(props);
		this.state = { actionable: props.actionable };
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
			default: // todo remove this everything should have a type
				return this.renderSearchProfile();
		}
	}

	async requestMentor(username) {
		console.log("going to request user " + username);
		this.setState({ actionable: false });
		await sendRequest(username);
		// API call to accept mentor
	}

	acceptMentor(username) {
		// API call to accept mentor
	}

	ignoreMentor(username) {
		// API call to ignore mentor
	}

	messageMentor(username) {
		// API call to message mentor
	}

	blockMentor(username) {
		// API call to ignore mentor
	}

	endMentor(username) {
		// API call to end mentor
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

	renderTags(tags) {
		if (!tags || tags.length == 0)
			return null;
		return (
			<ul className="tags-container">
				{ tags.map( tag => <li key={tag} className="tag">{tag}</li>)
				}
			</ul>
		);
	}

	renderRating(rating) {
		if (!rating) return <span>Not rated yet </span>;
		return (
			<span>
				{[1,2,3,4,5].map( i => {
					if (rating >= i)
						return <i key={i} className="material-icons">star</i>;
					if (rating >= i - 0.5)
						return <i key={i} className="material-icons">star_half</i>;
					return <i key={i} className="material-icons">star_border</i>;
				})}
			</span>
		)
	}

	renderSearchProfile() {
		const {
			bio,
			email,
			firstName,
			lastName,
			location,
			rating,
			tags,
			username
		} = this.props;
		const actionable = this.state.actionable;

		return (
			<div className="profileCard">
				<div className="profile-top">
					{ this.renderRating(Math.random()*5.0) }
					<div> <i className="material-icons">location_on</i> { location }</div>
				</div>
				<div className="profile-picture">
					<Gravatar size={100} protocol="https://" email={email} />
				</div>
				<div className="profile-content">
					<h3>{ firstName + " " +  lastName }</h3>
					{ bio } <br/>
					{ this.renderTags(tags) }
				</div>
				<div className="profile-actions">
					<button
						className={"btn btn-" + (actionable ? "primary" : "secondary")}
						disabled={!actionable}
						onClick={this.requestMentor.bind(this, username)}>
						{actionable ? "MENTOR ME" : "Requested!"}
					</button>
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
