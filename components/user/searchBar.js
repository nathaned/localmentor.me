import React, { Component } from 'react';
import Select from 'react-select';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleTagChange(value) {
		const inputSearch = e.target.value;
		this.setState({ inputSearch });
	}

	render(props) {
		return (
			<div className="search-bar" >
				<Select
					arrowRenderer={null}
					backspaceRemoves={false}
					clearable={false}
					multi={true}
					onChange={this.handleTagChange.bind(this)}
					options={this.props.tags}
					placeholder="Search mentors by tags"
					value={this.state.inputSearch}/>
				<button
					className="btn btn-primary"
					onClick={() => this.testButon()}>
					Seach
				</button>
			</div>
		);
	}
}
