import React, { Component } from 'react';
import Head from '../components/head'
import HomeNav from '../components/public/homeNav'
import Footer from '../components/footer'
import fetch from 'isomorphic-fetch';
import NProgress from 'nprogress';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputUsername: '',
			inputPassword: ''
		};
	}

	static async getInitialProps ({req, query}) {
		const user = req && req.session
			? (req.session.user || null)
			: null;
		console.log("user: " + user);
		return { user };
	}

	async handleSubmit(e) {
		NProgress.start();   // start the cool loading bar
		e.preventDefault();  // prevents default behavior

		// TODO change the page when it's loading, add server-side loading time?
		this.setState({ loading: true });

		// params needed to send to the server to validate the login
		const body = JSON.stringify({
			username: this.state.inputUsername,
			password: this.state.inputPassword
		});
		const headers = { 'Content-Type': 'application/json' };
		const credentials = 'include';
		NProgress.set(0.4);
		const response = await fetch(
			'/api/login',
			{ method: "POST", body, headers, credentials }
		);

		NProgress.done();
		// server will send a 403 if login failed
		if (response.status == 403) {
			this.setState({
				errorMessage: "Invalid username/password",
				loading: false
			});
			return;
		}

		// if login successful, load the find-a-mentor page.
		// we may put a redirect page in the url ( TODO )
		if (response.status == 200) {
			window.location = '/find-a-mentor';
		}
	}

	handleChange(e) {
		if (e.target.id == "inputUsername")
			this.setState({inputUsername: e.target.value});
		else if (e.target.id == "inputPassword")
			this.setState({inputPassword: e.target.value});
	}

	render() {
		return (
			<div className="app-container">
				<div className="site-wrapper">
					<div className="site-wrapper-inner">
						<div className="cover-container">
							<Head
								title="Login / Register"
								cssFiles={ ["login.css", "nprogress.css"] }/>
							<HomeNav page="login"/>
							<form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
								<h2 className="form-signin-heading">Please sign in</h2>
								<p id="error-message" display={this.state.errorMessage ? null : "none"}>{this.state.errorMessage}</p>
								<input type="text" id="inputUsername" className="form-control" placeholder="Username" value={this.state.inputUsername} onChange={this.handleChange.bind(this)} required autoFocus/>
								<input type="password" id="inputPassword" className="form-control" placeholder="Password" value={this.state.inputPassword} onChange={this.handleChange.bind(this)} required/>
								<input className="btn btn-lg btn-primary btn-block" type="submit"/>
							</form>
							<Footer />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
