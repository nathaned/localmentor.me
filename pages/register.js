import React, { Component } from 'react';
import Head from '../components/head'
import HomeNav from '../components/public/homeNav'
import Footer from '../components/footer'
import fetch from 'isomorphic-fetch';
import NProgress from 'nprogress';

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputUsername: '',
			inputPassword: '',
			inputPassword2: ''
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
			password: this.state.inputPassword,
			password2: this.state.inputPassword2
		});
		const headers = { 'Content-Type': 'application/json' };
		const credentials = 'include';
		NProgress.set(0.4);
		const response = await fetch(
			'/api/register',
			{ method: "POST", body, headers, credentials }
		);

		NProgress.done(); // finish the loading animation

		if (response.status == 200) {
			// if login successful, load the find-a-mentor page.
			// we may put a redirect page in the url ( TODO )
			window.location = '/find-a-mentor';
		}
		else {
			console.log(response);
			const contents = await response.json();
			const error = contents.error || "Error";
			// server will send some other status if login failed
			this.setState({
				errorMessage: error,
				loading: false // todo use this loading flag
			});
			return;
		}

	}

	handleChange(e) {
		if (e.target.id == "inputUsername")
			this.setState({ inputUsername: e.target.value });
		else if (e.target.id == "inputPassword")
			this.setState({ inputPassword: e.target.value });
		else if (e.target.id == "inputPassword2")
			this.setState({ inputPassword2: e.target.value });
	}

	render() {
		return (
			<div className="app-container">
				<div className="site-wrapper">
					<div className="site-wrapper-inner">
						<div className="cover-container">
							<Head
								title="Login / Register"
								cssFiles={ ["register.css", "nprogress.css"] }/>
							<HomeNav page="login"/>
							<form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
								<h2 className="form-signin-heading">Make an Account</h2>
								<p id="error-message" display={this.state.errorMessage ? null : "none"}>{this.state.errorMessage}</p>
								<input type="text" id="inputUsername" className="form-control" placeholder="Username" value={this.state.inputUsername} onChange={this.handleChange.bind(this)} required autoFocus/>
								<input type="password" id="inputPassword" className="form-control" placeholder="Password" value={this.state.inputPassword} onChange={this.handleChange.bind(this)} required/>
								<input type="password" id="inputPassword2" className="form-control" placeholder="Confirm Password" value={this.state.inputPassword2} onChange={this.handleChange.bind(this)} required/>
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
