import React, { Component } from 'react';


export default class MentorItem extends Component {

	constructor(props) {
		super(props);
	}
	
	fancyAlert(){
		
		alert('fancy click');
		
	}
	
	
	render(props) {
			
		return (
			<div className="mentor item">
				
				<div className="profile picture" style={{ display:'inline-block'}}>
					{"Picture: "} 
					{this.props.thing}
					Profile Picture
				</div>
				
				<div className="profile wrapper" style={{ display:'inline-block'}}>
					
					<div className="profile description" >
						{"Bio: "} 
						{this.props.profileText}
					</div>
					
					<div className="profile tags" >
						{"Tags: "} 
						{this.props.tags.map((test) => <li > {test} </li> )}
					</div>
					
					<div className="profile rating" >
						{"Rating: "} 
						{this.props.rating}
					</div>
					
					<div className="distance" >
						{"Distance: "} 
						{this.props.distanceAway}
					</div>
					
				</div>
								
				<div className="message button" style={{ display:'inline-block'}}>
					<button className="square" onClick={() => this.fancyAlert()}>
						{"MENTOR ME!"}
					</button>
				</div>
				
							
			</div>
		);
	}
}
