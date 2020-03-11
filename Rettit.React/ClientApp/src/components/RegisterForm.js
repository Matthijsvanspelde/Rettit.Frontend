import React, { Component } from 'react';
import axios from 'axios';

export class RegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			Username: '',
			Password: '',
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
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
	}

    render() {
		const { Username, Password} = this.state
		return (
			<div>
				<h4>Register</h4>
				<form onSubmit={this.submitHandler}>
					<div className="form-group">
						<label>Username</label>
						<input
							className="form-control"
							type="text"
							name="Username"
							value={Username}
							onChange={this.changeHandler}
						/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input
							className="form-control"
							type="password"
							name="Password"
							value={Password}
							onChange={this.changeHandler}
						/>
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
        );
  }
}
