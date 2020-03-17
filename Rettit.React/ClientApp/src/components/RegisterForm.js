import React, { Component } from 'react';
import axios from 'axios';

const validateForm = (errors) => {
	let valid = true;
	Object.values(errors).forEach(
		(val) => val.length > 0 && (valid = false)
	);
	return valid;
}

export class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: null,
			password: null,
			errors: {
				username: '',
				password: '',
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
						? 'Username must be 5 characters long!'
						: '';
				break;
			case 'password':
				errors.password =
					value.length < 8
						? 'Password must be 8 characters long!'
						: '';
				break;
			default:
				break;
		}

		this.setState({errors, [name]: value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if (validateForm(this.state.errors)) {
			event.preventDefault()
			console.log(this.state)
			axios.post('https://localhost:44365/api/users', this.state, {
				mode: 'cors',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				}
			}).then(res => {
				console.log(res);
			}).catch(err => {
				console.log(err.response);
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
					<h4>Register</h4>
					<form onSubmit={this.handleSubmit} noValidate >
						<div className='form-group'>
							<label htmlFor="username">Username</label>
							<input className="form-control" type='text' name='username' autoComplete='off' onChange={this.handleChange} noValidate />
							{errors.username.length > 0 &&
								<span style={{ color: "red" }} className='error'>{errors.username}</span>}
						</div>
						<div className='form-group'>
							<label htmlFor="password">Password</label>
							<input className="form-control" type='password' name='password' autoComplete='off' onChange={this.handleChange} noValidate />
							{errors.password.length > 0 &&
								<span style={{ color: "red" }} className='error'>{errors.password}</span>}
						</div>
						<div className='submit'>
							<button className="btn btn-lg btn-primary btn-block">Create</button>
						</div>
					</form>
				</div>
			</div>
        );
  }
}
