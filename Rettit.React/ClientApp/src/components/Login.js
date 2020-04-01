import React, { Component } from 'react';
import axios from 'axios';
import Link from 'react-router-dom/Link';

const validateForm = (errors) => {
	let valid = true;
	Object.values(errors).forEach(
		(val) => val.length > 0 && (valid = false)
	);
	return valid;
}

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: null,
			password: null,
			generalError: null,
			errors: {
				username: '',
				password: '',
				generalError: '',
			}
		};
	}

	handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = this.state.errors;		
		this.setState({ errors, [name]: value });
	}

	combinationExists() {
		const { name, value } = 'generalError';
		let errors = this.state.errors;
		errors.generalError = 'Invalid username and password combination!'
		this.setState({ errors, [name]: value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if (validateForm(this.state.errors.username) && validateForm(this.state.errors.password)) {
			event.preventDefault()
			axios.post('https://localhost:44365/api/authentication', this.state, {
				mode: 'cors',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				}
			}).then(res => {
				console.log(res);
				localStorage.setItem("token", res.data.token);
				this.props.history.push('/');
			}).catch(err => {
				if (err.response.status === 401) {
					this.combinationExists(event);
				}
			});
		} else {
			console.error('Invalid Form')
		}
	}

	render() {
		const { errors } = this.state;
		return (
			<div className='wrapper'>
				<div className='form-wrapper'>
					<h4>Log in</h4>
					<p>New to Rettit? <Link to="/register" >Sign up</Link></p>
					<span style={{ color: "red" }} className='error'>{errors.generalError}</span>
					<form onSubmit={this.handleSubmit} noValidate >
						<div className='form-group'>
							<label htmlFor="username">Username</label>
							<input className="form-control" type='text' name='username' autoComplete='off' onChange={this.handleChange} noValidate />
							{errors.username.length > 0 &&
								<span style={{ color: "red" }} className='error'>{errors.username} </span>}
						</div>
						<div className='form-group'>
							<label htmlFor="password">Password</label>
							<input className="form-control" type='password' name='password' autoComplete='off' onChange={this.handleChange} noValidate />
							{errors.password.length > 0 &&
								<span style={{ color: "red" }} className='error'>{errors.password}</span>}
						</div>
						<div className='submit'>
							<button className="btn btn-lg btn-primary btn-block">Log in</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}