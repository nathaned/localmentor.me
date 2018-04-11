import React, { Component } from 'react';
import NextHead from 'next/head'

export default class Head extends Component {
	constructor(props) {
		super(props);
	}

	renderCSS() {
		return  this.props.cssFiles.map((item) => (
			<link
				rel="stylesheet"
				type="text/css"
				href={"./static/css/" + item}
				key={item}
			/>
		));
	}

	render() {
		const props = this.props;
		const defaultDescription = ''
		const defaultOGURL = ''
		const defaultOGImage = ''
		return (
			<NextHead>
				<meta charSet="UTF-8" />
				<title>{props.title || ''}</title>
				<meta name="description" content={props.description || defaultDescription} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/static/images/network.png" />
				<meta property="og:url" content={props.url || defaultOGURL} />
				<meta property="og:title" content={props.title || ''} />
				<meta property="og:description" content={props.description || defaultDescription} />


				{/*  This stuff is what I added: */}
				{ this.renderCSS() }
				<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
			</NextHead>
		);
	}
}
