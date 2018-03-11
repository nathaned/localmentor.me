import React, { Component } from 'react';
import MentorItem from './mentorItem';

export default class MentorList extends Component {
	constructor(props) {
		super(props);
	}
	
	
	
	
	getMentors(id, searchThing){
		
		var json = '[{ "username": "abc", "rating":"3", "profileText": "wafiojaewiofjaiof aewifjaoiwfjwefja iojfa", "distanceAway": "4", "Tags": ["UCF", "Vegan"]}, {"username": "def", "rating":"4", "profileText": "as aewifjaoiwfjwefja iojfa", "distanceAway": "21", "Tags": ["USF", "Clubs"]}, {"username": "fawe", "rating":"2", "profileText": "sd dfew iojfa", "distanceAway": "5", "Tags": ["UCF", "BugerU"]}]';
		var obj = JSON.parse(json);
		
		
		
		return(
			obj
		);
	}
	
	render(props) {
	
		return (
			<div className="mentor list">
				
				
				{this.getMentors(0,0).map((obj) => <MentorItem username={obj.username} rating={obj.rating} profileText={obj.profileText} distanceAway={obj.distanceAway} tags={obj.Tags} />)}
				
			</div>
		);
	}
}
