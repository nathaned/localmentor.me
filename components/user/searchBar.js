import React, { Component } from 'react';
import Select from 'react-select';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			locations: [
				{ label: "Orlando, FL", value: "Orlando, FL"},
				{ label: "New York, NY", value: "New York, NY"},
				{ label: "Tampa, FL", value: "Tampa, FL"},
				{ label: "Miami, FL", value: "Miami, FL"},
				{ label: "Atlanta, GA", value: "Atlanta, GA"}
			]
		};
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
		if (!this.state.inputSearch || !this.state.inputSearch.length ||
			!this.state.inputLocation || !this.state.inputLocation.value
		) {
			return this.setState({ error: true })
		}
		const tags = this.state.inputSearch.map( ({value}) => value);
		const location = this.state.inputLocation.value;
		await this.props.onClick(tags, location);
		this.setState({ error: false });
	}

	render(props) {
		console.log(this.state);
		return (
			<div id="search-bar">
				{ this.state.error ? (
					<div id="search-alert">
						<div className="alert alert-warning" role="alert">
							Select tags and location to search.
						</div>
					</div>
				) : null }
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
					options={this.state.locations}
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
