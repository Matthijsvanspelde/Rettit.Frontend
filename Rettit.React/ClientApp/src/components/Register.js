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

export class Register extends Component {
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

		switch (name) {
			case 'username':
				errors.username =
					value.length < 5
						? 'Username must be more than 5 characters long!'
						: '';
				break;
			case 'password':
				errors.password =
					value.length < 8
						? 'Password must be more than 8 characters long!'
						: '';
				break;
			default:
				break;
		}		
		this.setState({errors, [name]: value});
	}

	usernameExists() {
		const { name, value } = 'username';
		let errors = this.state.errors;
		errors.generalError = 'Invalid data entered!'
		this.setState({ errors, [name]: value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if (validateForm(this.state.errors.username) && validateForm(this.state.errors.password)) {
			event.preventDefault()
			axios.post('https://rettitapi.azurewebsites.net/api/register', this.state, {
				mode: 'cors',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				}
			}).then(res => {
				console.log(res);
				this.props.history.push('/login');
			}).catch(err => {
				if (err.response.status === 422) {
					this.usernameExists(event);
				}
			});
		} else {
			console.error('Invalid Form')
		}
	}

	render() {
		const { errors } = this.state;
		if (this.props.IsLoggedIn === false) {
			return (
				<div>
					<div className="card mx-auto" style={{ maxWidth: 500 }}>
					<div className="card-body">
					<h4>Sign up</h4>
					<p>Already got an account? <Link to="/login" >Sign in</Link></p>
					<span className='error'>{errors.generalError}</span>
					<form onSubmit={this.handleSubmit} noValidate >
						<div className='form-group'>
							<label htmlFor="username">Username</label>
							<input className="form-control" type='text' name='username' autoComplete='off' onChange={this.handleChange} noValidate /><br />
							{errors.username.length > 0 &&
								<div class="alert alert-primary" role="alert">
									{errors.username}
								</div>}
						</div>
						<div className='form-group'>
							<label htmlFor="password">Password</label>
							<input className="form-control" type='password' name='password' autoComplete='off' onChange={this.handleChange} noValidate /><br />
							{errors.password.length > 0 &&
								<div class="alert alert-primary" role="alert">
									{errors.password}
								</div>}
						</div>
						<div className='submit'>
							<button className="btn btn-lg btn-primary btn-block">Create account</button>
						</div>
					</form>
					</div>
					</div>
				</div>
			);
		} else {
			return (
				<div class="alert alert-primary" role="alert">
					You are already logged in!
				</div>
			);
		}
		
  }
}
