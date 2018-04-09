import React, { Component } from 'react';
import ProfileCard from './profileCard';
import Gravatar from 'react-gravatar';
import { getProfile, getTags } from '../../lib/api/user';
import NProgress from 'nprogress';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = { edit: true };
	}

	async componentDidMount() {
		await this.loadProfile();
		await this.loadTags();
	}

	async loadProfile() {
		const profile = await getProfile(this.props.baseUrl);
		console.log(profile);
		this.setState({ profile });
	}

	async loadTags() {
		console.log("getting tags");
	}

	async handleSubmit(e) {
		NProgress.start();   // start the cool loading bar
		e.preventDefault();  // prevents default behavior

		// params needed to send to the server to validate the login
		const body = JSON.stringify({
			profile: this.state.profile
		});
		const headers = { 'Content-Type': 'application/json' };
		const credentials = 'include';
		NProgress.set(0.4);
		const response = await fetch(
			'/api/profile',
			{ method: "POST", body, headers, credentials }
		);
		console.log("here in handleSubmit");
		NProgress.set(0.7);

		console.log(response);
		// server will send a 403 if login failed
		if (response.status == 403) {
			// should show an error message, TODO
			return;
		}


		if (response.status == 200) {
			await this.loadProfile();
		}
		NProgress.done();
	}


	handleChange(e) {
		const value = e.target.value;
		switch(e.target.id) {
			case "firstName":
				this.setState( ({profile}) => ({
					profile: { ...profile, firstName: value}
				}));
				break;
			case "lastName":
				this.setState( ({profile}) => ({
					profile: { ...profile, lastName: value}
				}));
				break;
			case "email":
				this.setState( ({profile}) => ({
					profile: { ...profile, email: value}
				}));
				break;
			case "bio":
				this.setState( ({profile}) => ({
					profile: { ...profile, bio: value}
				}));
				break;
			case "mentor-checkbox":
				this.setState( ({profile}) => ({
					profile: { ...profile, isMentor: !profile.isMentor }
				}));
				break;
			case "mentee-checkbox":
				this.setState( ({profile}) => ({
					profile: { ...profile, isMentee: !profile.isMentee }
				}));
				break;
		}
		console.log(this.state);
	}

	render() {

		if (!this.state.profile) {
			return (
				<div className="inner cover">
					<div id="profile-container">
						<h1 className="loading-text">Loading...</h1>
					</div>
				</div>
			);
		}

		// if not in edit mode, just show the regular profile card
		if (!this.state.edit) {
			return (
				<div id="profileCard-container">
					<ProfileCard
						action={"edit"}
						expanded={true}
						user={this.props.user} />
				</div>
			)
		}
		return (
			<div className="inner cover">
				<div id="profile-container">
					<h1>Edit Profile</h1>
					<hr/>
					<div className="row">
							<div className="col-md-3">
								<div className="text-center">
									<Gravatar protocol="https://" email="mathews.kyle@gmail.com" />
								</div>
							</div>

							<div className="col-md-9 personal-info">
								<form className="form-horizontal" role="form">
									<div className="form-group">
										<label className="col-lg-3 control-label">First name:</label>
										<div className="col-lg-8">
											<input
												className="form-control"
												id="firstName"
												onChange={this.handleChange.bind(this)}
												type="text"
												value={this.state.profile.firstName}/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-lg-3 control-label">Last name:</label>
										<div className="col-lg-8">
											<input
												className="form-control"
												id="lastName"
												onChange={this.handleChange.bind(this)}
												type="text"
												value={this.state.profile.lastName}/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-lg-3 control-label">Email (used for Gravatar image):</label>
										<div className="col-lg-8">
											<input
												className="form-control"
												id="email"
												onChange={this.handleChange.bind(this)}
												type="text"
												value={this.state.profile.email}/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-3 control-label">Bio:</label>
										<div className="col-md-8">
											<textarea
												className="form-control"
												id="bio"
												onChange={this.handleChange.bind(this)}
												placeholder="Write a little about yourself. What you know, what you do, what you're looking for..."
												type="text"
												rows="8"
												value={this.state.profile.bio}>
											</textarea>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-3 control-label">Status:</label>
										<div className="col-md-8" id="status-container">
											<label>
												<input
													checked={this.state.profile.isMentor ? "checked" : false}
													className="form-control"
													id="mentor-checkbox"
													onChange={this.handleChange.bind(this)}
													type="checkbox" />
												<span>Mentor</span>
											</label>
											<label>
												<input
													checked={this.state.profile.isMentee ? "checked" : false}
													className="form-control"
													id="mentee-checkbox"
													onChange={this.handleChange.bind(this)}
													type="checkbox" />
												Mentee
											</label>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-3 control-label"></label>
										<div className="col-md-8">
											<input
												type="button"
												className="btn btn-primary"
												onClick={this.handleSubmit.bind(this)}
												value="Save Changes"/>
											<span></span>
											<input
												type="reset"
												className="btn btn-default"
												onClick={this.loadProfile.bind(this)}
												value="Cancel"/>
										</div>
									</div>
								</form>
							</div>
					</div>
				</div>
			</div>
		);
	}
}
