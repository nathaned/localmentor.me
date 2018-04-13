import React, { Component } from 'react';
import Select from 'react-select';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleTagChange(value) {
		const inputSearch = value;
		this.setState({ inputSearch });
	}

	handleLocationChange(value) {
		const inputLocation = value;
		this.setState({ inputLocation });
	}

	async handleSearch () {
		const params = this.state.inputSearch.map( ({value}) => value);
		const location = this.state.location;
		await this.props.onClick(params, location);
	}

	render(props) {
		console.log(this.state);
		return (
			<div id="search-bar">
				<Select
					id="tag-search"
					arrowRenderer={null}
					backspaceRemoves={false}
					clearable={false}
					multi={true}
					onChange={this.handleTagChange.bind(this)}
					options={this.props.tags}
					placeholder="Search mentors by tags"
					required={true}
					value={this.state.inputSearch} />
				<Select
					id="location-search"
					onChange={this.handleLocationChange.bind(this)}
					placeholder="Location"
					required={true}
					value={this.state.inputLocation} />
				<button
					id="search-button"
					className="btn btn-primary"
					onClick={this.handleSearch.bind(this)} >
					Search
				</button>
			</div>
		);
	}
}
