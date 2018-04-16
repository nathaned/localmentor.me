import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
import {
	acceptRequest,
	blockUser,
	endMentorship,
	ignoreRequest,
	rateMentorship,
	sendRequest
} from '../../lib/api/user';

export default class ProfileCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			actionable: props.actionable,
			showConfirmation: false,
			rating: 5
		};
	}

	async requestMentor() {
		const username = this.props.username;
		this.setState({ actionable: false });
		await sendRequest(username);
	}

	async acceptMentee() {
		const username = this.props.username;
		this.setState({ actionable: false });
		await acceptRequest(username);
		this.props.refresh();
	}

	async ignoreMentee() {
		const username = this.props.username;
		const confirmationCallback = async () => {
			await ignoreRequest(username);
			this.props.refresh();
		};
		const confirmationMessage = "Are you sure you want to ignore " + username + "? Note: this is permanent; they cannot request you again.";
		this.setState({
			showConfirmation: true,
			confirmationMessage,
			confirmationCallback
		});
	}

	async blockUser() {
		const username = this.props.username;
		const confirmationCallback = async () => {
			await blockUser(username);
			this.props.refresh();
		};
		const confirmationMessage = "Are you sure you want to block " + username + "? Note: this is permanent.";
		this.setState({
			showConfirmation: true,
			confirmationMessage,
			confirmationCallback
		});
	}

	async endUser() {
		const username = this.props.username;
		const confirmationCallback = async () => {
			await endMentorship(username);
			this.props.refresh();
		};
		const confirmationMessage = "Are you sure you want to end this mentorship with " + username + "?";
		this.setState({
			showConfirmation: true,
			confirmationMessage,
			confirmationCallback
		});
	}

	async rateUser(noRating = false) {
		const username = this.props.username;
		const rating = noRating ? 0 : this.state.rating;
		await rateMentorship(username, rating);
	}

	renderConfirmation() {
		const { confirmationMessage, confirmationCallback } = this.state;
		return (
			<div className="profileCard warning">
				<h2>{confirmationMessage}</h2>
				<div className="profile-actions">
					<button
						className="btn btn-primary"
						onClick={confirmationCallback}>
						Yes
					</button>
					<br />
					<button
						className="btn btn-secondary btn-sm"
						onClick={() => this.setState({ showConfirmation: false})}>
						Oops! Nevermind.
					</button>
					</div>
			</div>
		);
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
		);
	}

	renderLiveRating() {
		const rating = this.state.rating;
		return (
			<span>
				{[1,2,3,4,5].map( i =>
					<i
						key={i}
						className="material-icons"
						onClick={() => this.setState({ rating: i })}>
						{"star" + (rating >= i ? "" : "_border")}
					</i>
				)}
			</span>
		);
	}

	renderProfileActions() {
		const { type, username } = this.props;
		const actionable = this.state.actionable;
		console.log("rendering profilecard with type: ", type);
		return (
			<div className="profile-actions">
				{ type == "search" ? (
					<button
						className={"btn btn-" + (actionable ? "primary" : "secondary")}
						disabled={!actionable}
						onClick={this.requestMentor.bind(this)}>
						{actionable ? "MENTOR ME" : "Requested!"}
					</button>
				) : null }

				{ (type == "request" && actionable )? (
					<button
						className="btn btn-secondary"
						onClick={this.ignoreMentee.bind(this)}>
						Ignore
					</button>
				) : null }

				{ (type == "request" && actionable )? (
					<button
						className="btn btn-success"
						onClick={this.acceptMentee.bind(this)}>
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
						className="btn btn-secondary btn-sm"
						onClick={this.endUser.bind(this)}>
						End Mentorship
					</button>
				) : null }
				{ (type == "connection" && actionable )? (
					<button
						className="btn btn-secondary btn-sm"
						onClick={this.blockUser.bind(this)}>
						Block User
					</button>
				) : null }

			</div>
		);
	}

	renderRateCard() {
		const { email, firstName, lastName } = this.props;
		return (
			<div className="profileCard">
				<div className="profile-picture">
					<Gravatar size={100} protocol="https://" email={email} />
				</div>
				<div className="profile-content">
					<h3>Rate { firstName + " " +  lastName }</h3>
					<p>
						The mentorship between you and {firstName} has ended.<br/>
						Provide a rating to help other users.
					</p>
					{ this.renderLiveRating() }
					<br />
					<button
						className="btn btn-success"
						onClick={this.rateUser.bind(this)}>
						Submit Rating
					</button>
					<br />
					<button
						className="btn btn-secondary btn-sm delete-rating"
						onClick={this.rateUser.bind(this, true)}>
						Delete without Rating
					</button>
				</div>
			</div>
		);
	}

	render() {
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
		const { actionable, showConfirmation } = this.state;

		if (showConfirmation) {
			return this.renderConfirmation();
		}

		if (type == "rate") {
			return this.renderRateCard();
		}

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
}
