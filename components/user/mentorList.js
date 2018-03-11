import React, { Component } from 'react';
import MentorItem from './mentorItem';


export default class MentorList extends Component {
	constructor(props) {
		super(props);
	}
	render(props) {
		return (
			<div className="mentor list">
				<MentorItem />
				<MentorItem />
				<MentorItem />
				
				
			</div>
		);
	}
}
