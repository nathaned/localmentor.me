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
			obj.map((item, i) =>
				<MentorItem
					username={item.username}
					rating={item.rating}
					profileText={item.profileText}
					distanceAway={item.distanceAway}
					tags={item.Tags}
					key={i}
				/>
		));
	}

	render(props) {

		return (
			<div className="mentor list">

				{ this.getMentors(0,0) }

			</div>
		);
	}
}
