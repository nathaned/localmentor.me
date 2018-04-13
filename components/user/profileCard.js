import React, { Component } from 'react';
import Gravatar from 'react-gravatar';

export default class ProfileCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			
			this.props.connections
				? this.renderConnectionsProfile()
				:(this.props.expanded
					? this.renderExpandedProfile()
					: this.renderShortProfile()
				
				)
		);
	}

	// This currently isnt working
	toggleExpanded(){
		this.setState({expanded: !this.state.expanded});

	}
	
	
	acceptMentor(){
		
	}
	
	ignoreMentor(){
		
	}

	renderRequestButton() {
		return (
			<button id = "requestButton" className="btn btn-primary" onClick={() => this.toggleExpanded()}>
				{"MENTOR ME"}
			</button>
		)
	}
	
	renderAcceptButton() {
		return (
			<button id = "acceotButton" className="btn btn-primary" onClick={() => this.acceptMentor()}>
				{"Accept"}
			</button>
		)
	}
	
	renderIgnoreButton() {
		return (
			<button id = "ignoreButton" className="btn btn-primary" onClick={() => this.ignoreMentor()}>
				{"Ignore"}
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
			bio,
			tags,
			rating500,
			numRatings,
			distanceAway
		} = this.props;

		return (
			<div className="profileCard" onClick={this.props.onClick}>
				<div className="profle-picture">
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
						{ distanceAway + " Miles" } <br/>
					</div>
					
					<div className="buttons">
						{ this.renderAcceptButton() }
						{ this.renderIgnoreButton() }
					</div>
					
				</div>
			</div>
		);
	}
}
