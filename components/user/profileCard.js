import React, { Component } from 'react';
import Gravatar from 'react-gravatar';

export default class ProfileCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			
			this.props.connections
				?(this.props.connected
					? this.renderConnectedProfile()
					: this.renderConnectionsProfile()
				
				)
				
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
	
	RequestMentor(){
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
	
	renderMessageButton() {
		return (
			<button id = "ignoreButton" className="btn btn-primary" onClick={() => this.ignoreMentor()}>
				{"Message"}
			</button>
		)
	}
	
	renderBlockButton() {
		return (
			<button id = "ignoreButton" className="btn btn-primary" onClick={() => this.ignoreMentor()}>
				{"Block"}
			</button>
		)
	}
	
	renderEndButton() {
		return (
			<button id = "endButton" className="btn btn-primary" onClick={() => this.endMentor()}>
				{"End"}
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
