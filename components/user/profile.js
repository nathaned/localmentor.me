import React, { Component } from 'react';
import ProfileCard from './profileCard'
import Gravatar from 'react-gravatar'

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = { edit: true };
		this.getProfile();
	}

	async componentDidMount() {
		await this.getProfile();
	}

	async getProfile() {
		console.log(this.props);
		this.setState({ profile: true });
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
											<input className="form-control" type="text" value="Jane"/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-lg-3 control-label">Last name:</label>
										<div className="col-lg-8">
											<input className="form-control" type="text" value="Bishop"/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-lg-3 control-label">Email (used for Gravatar image):</label>
										<div className="col-lg-8">
											<input className="form-control" type="text" value="janesemail@gmail.com"/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-3 control-label">Bio:</label>
										<div className="col-md-8">
											<textarea className="form-control" type="text" rows="8" placeholder="Write a little about yourself. What you know, what you do, what you're looking for..."></textarea>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-3 control-label">Status:</label>
										<div className="col-md-8" id="status-container">
											<label>
												<input className="form-control" type="checkbox" id="mentor-checkbox"/>
												<span>Mentor</span>
											</label>
											<label>
												<input className="form-control" type="checkbox" id="mentee-checkbox"/>Mentee
											</label>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-3 control-label">Confirm password:</label>
										<div className="col-md-8">
											<input className="form-control" type="password" value="11111122333"/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-md-3 control-label"></label>
										<div className="col-md-8">
											<input type="button" className="btn btn-primary" value="Save Changes"/>
											<span></span>
											<input type="reset" className="btn btn-default" value="Cancel"/>
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
