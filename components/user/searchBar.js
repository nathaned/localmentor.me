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

	async handleSearch () {
		const params = this.state.inputSearch.map( ({value}) => value);
		await this.props.onClick(params);
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
					onClick={this.handleSearch.bind(this)}>
					Search
				</button>
			</div>
		);
	}
}
