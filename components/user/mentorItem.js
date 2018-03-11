import React, { Component } from 'react';


export default class MentorItem extends Component {
	constructor(props) {
		super(props);
	}
	render(props) {
		return (
			<div className="mentor item">
				
				<div className="profile picture" style={{ display:'inline-block'}}>
					Profile Picture
				</div>
				
				<div className="profile wrapper" style={{ display:'inline-block'}}>
					
					<div className="profile description" >
						Profile Description
					</div>
					
					<div className="profile tags" >
						Tags
					</div>
					
					<div className="profile rating" >
						Rating
					</div>
					
				</div>
				
								
				<div className="message button" style={{ display:'inline-block'}}>
					MENTOR MEEEEE!!!
				</div>
				
			</div>
		);
	}
}
