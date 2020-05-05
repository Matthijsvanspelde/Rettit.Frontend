import React, { Component } from 'react';
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';

const validateForm = (errors) => {
	let valid = true;
	Object.values(errors).forEach(
		(val) => val.length > 0 && (valid = false)
	);
	return valid;
}

export class CreateSubForum extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			about: null,
			rule1: null,
			rule2: null,
			rule3: null,
			generalError: null,
			errors: {
				name: '',
				about: '',
				rule1: '',
				rule2: '',
				rule3: '',
				generalError: '',
			}
		};
	}

	handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = this.state.errors;

		switch (name) {
			case 'name':
				errors.name =
					value.length < 5
					? 'Name must be more than 5 characters long!'
						: '';
				break;
			case 'about':
				errors.about =
					value.length < 20
					? 'About must be more than 20 characters long!'
						: '';
				break;
			case 'rule1':
				errors.rule1 =
					value.length < 1
						? 'Rules must be more than 1 character long!'
						: '';
				break;
			case 'rule2':
				errors.rule2 =
					value.length < 1
						? 'Rules must be more than 1 character long!'
						: '';
				break;
			case 'rule3':
				errors.rule3 =
					value.length < 1
						? 'Rules must be more than 1 character long!'
						: '';
				break;
			default:
				break;
		}
		this.setState({ errors, [name]: value });
	}

	nameExists() {
		const { name, value } = 'name';
		let errors = this.state.errors;
		errors.generalError = 'Community name already exists!'
		this.setState({ errors, [name]: value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
			event.preventDefault()
			axios.post('https://rettitapi.azurewebsites.net/api/SubForums', this.state, {
				mode: 'cors',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem("token"),
				}
			}).then(res => {
				console.log(res);
			}).catch(err => {
				console.log(err);
				if (err.response.status === 422) {
					this.nameExists(event);
				}
			});		
	}

	render() {
		const { errors } = this.state;
		if (this.props.IsLoggedIn === true) {
			return (
				<div>
					<div className="card mx-auto" style={{ maxWidth: 600 }}>
					<div className="card-body">
					<h4>Create your own community</h4>
					<span style={{ color: "red" }} className='error'>{errors.generalError}</span>
					<form onSubmit={this.handleSubmit} noValidate >
						<div className='form-group'>
							<label htmlFor="name">Community name</label>
							<input className="form-control" type='text' name='name' autoComplete='off' onChange={this.handleChange} noValidate />
							{errors.name.length > 0 &&
								<span style={{ color: "red" }} className='error'>{errors.name} </span>}
						</div>
						<div className='form-group'>
							<label htmlFor="about">About</label>
							<textarea className="form-control" type='text' name='about' autoComplete='off' rows='3' onChange={this.handleChange} noValidate />
							{errors.about.length > 0 &&
								<span style={{ color: "red" }} className='error'>{errors.about} </span>}
						</div>
						<div className='form-group'>
							<label htmlFor="rule1">Rule 1</label>
							<input className="form-control" type='text' name='rule1' autoComplete='off' onChange={this.handleChange} noValidate />
							{errors.rule1.length > 0 &&
								<span style={{ color: "red" }} className='error'>{errors.rule1} </span>}
						</div>
						<div className='form-group'>
							<label htmlFor="rule2">Rule 2</label>
							<input className="form-control" type='text' name='rule2' autoComplete='off' onChange={this.handleChange} noValidate />
							{errors.rule2.length > 0 &&
								<span style={{ color: "red" }} className='error'>{errors.rule2} </span>}
						</div>
						<div className='form-group'>
							<label htmlFor="rule3">Rule 3</label>
							<input className="form-control" type='text' name='rule3' autoComplete='off' onChange={this.handleChange} noValidate />
							{errors.rule3.length > 0 &&
								<span style={{ color: "red" }} className='error'>{errors.rule3} </span>}
						</div>
						<div className='submit'>
							<button className="btn btn-lg btn-primary btn-block">Create</button>
						</div>
					</form>
					</div>
					</div>
				</div>
			);
        } else {
			return (
				<div class="alert alert-primary" role="alert">
					You have to be signed in to create a subcommunity!
				</div>
			);
        }
		
	}
}