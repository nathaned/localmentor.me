import React, { Component } from 'react';
import NextHead from 'next/head'

const defaultDescription = ''
const defaultOGURL = ''
const defaultOGImage = ''

class Homepage extends Component {
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
		return (
			<NextHead>
				<meta charset="UTF-8" />
				<title>{props.title || ''}</title>
				<meta name="description" content={props.description || defaultDescription} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
				<link rel="apple-touch-icon" href="/static/touch-icon.png" />
				<link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
				<link rel="icon" href="/static/favicon.ico" />
				<meta property="og:url" content={props.url || defaultOGURL} />
				<meta property="og:title" content={props.title || ''} />
				<meta property="og:description" content={props.description || defaultDescription} />
				<meta name="twitter:site" content={props.url || defaultOGURL} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:image" content={props.ogImage || defaultOGImage} />
				<meta property="og:image" content={props.ogImage || defaultOGImage} />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />


				{/*  This stuff is what I added: */}
				{ this.renderCSS() }
				<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
			</NextHead>
		);
	}
}

export default Homepage;

