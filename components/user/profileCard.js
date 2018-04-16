import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
import { sendRequest } from '../../lib/api/user';

export default class ProfileCard extends Component {
	constructor(props) {
		super(props);
		this.state = { actionable: props.actionable };
	}

	render() {
		return this.renderProfile();
		/*
		switch (this.props.type) {
			case "search":
				return this.renderProfile();
			case "request":
				return this.renderRequestProfile();
			case "connectedMentor":
				return this.renderConnectedMenteeProfile();
			case "connectedMentee":
				return this.renderConnectedMenteeProfile();
			default: // todo remove this everything should have a type
				return this.renderProfile();
		}
		*/
	}

	async requestMentor(username) {
		this.setState({ actionable: false });
		await sendRequest(username);
	}

	async acceptMentee(username) {
		// API call to accept mentor
	}

	async ignoreMentee(username) {
		// API call to ignore mentor
	}

	async messageUser(username) {
		console.log("message button clicked, username: ", username);
		window.location = ('/messenger#' + username);
	}

	async blockUser(username) {
		// API call to ignore mentor
	}

	async endUser(username) {
		// API call to end mentor
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

	renderProfileActions() {
		const { type, username } = this.props;
		const actionable = this.state.actionable;
		return (
			<div className="profile-actions">
				{ type == "search" ? (
					<button
						className={"btn btn-" + (actionable ? "primary" : "secondary")}
						disabled={!actionable}
						onClick={this.requestMentor.bind(this, username)}>
						{actionable ? "MENTOR ME" : "Requested!"}
					</button>
				) : null }

				{ (type == "request" && actionable )? (
					<button
						className="btn btn-secondary"
						onClick={this.ignoreMentee.bind(this, username)}>
						Ignore
					</button>
				) : null }

				{ (type == "request" && actionable )? (
					<button
						className="btn btn-success"
						onClick={this.acceptMentee.bind(this, username)}>
						Accept
					</button>
				) : null }

				{ type == "connection" ? (
					<a
						className="btn btn-primary"
						href={"/messenger#" + username}>
						Message
					</a>
				) : null }

				{ (type == "connection" && actionable )? (
					<button
						className="btn btn-success"
						onClick={this.acceptMentee.bind(this, username)}>
						Accept
					</button>
				) : null }

			</div>
		)
	}

	renderProfile() {
		const {
			bio,
			email,
			firstName,
			lastName,
			location,
			rating,
			tags,
			type,
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
					<p>{ bio }</p>
					{ this.renderTags(tags) }
				</div>
				{ this.renderProfileActions() }
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
