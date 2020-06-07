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
		axios.post('https://localhost:44365/api/SubForums', this.state, {
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
				<div style={{ paddingBottom: 24 }}>
					<div className="card mx-auto" style={{ maxWidth: 820 }}>
					<div className="card-body">
					<h4>Create a community</h4>
					<span style={{ color: "red" }} className='error'>{errors.generalError}</span>
					<form onSubmit={this.handleSubmit} noValidate >
						<div className='form-group'>
									<label htmlFor="name">Name</label><br />
									<label style={{ fontSize: 12, color: '#666666' }} htmlFor="name">Community names including capitalization cannot be changed.</label>
							<input className="form-control" type='text' name='name' autoComplete='off' onChange={this.handleChange} noValidate /><br/>
							{errors.name.length > 0 &&
										<div class="alert alert-primary" role="alert">
											{errors.name}
										</div>}
						</div>
						<div className='form-group'>
									<label htmlFor="name">Discription</label><br/>
									<label style={{ fontSize: 12, color: '#666666' }} htmlFor="name">This is how new members come to understand your community.</label>
							<textarea className="form-control" type='text' name='about' autoComplete='off' rows='3' onChange={this.handleChange} noValidate /><br/>
							{errors.about.length > 0 &&
										<div class="alert alert-primary" role="alert">
											{errors.about}
										</div>}
						</div>
						<div className='form-group'>
							<label htmlFor="rule1">Rule #1</label>
									<input className="form-control" type='text' name='rule1' autoComplete='off' onChange={this.handleChange} noValidate /><br />
							{errors.rule1.length > 0 &&
										<div class="alert alert-primary" role="alert">
											{errors.rule1}
										</div>}
						</div>
						<div className='form-group'>
							<label htmlFor="rule2">Rule #2</label>
									<input className="form-control" type='text' name='rule2' autoComplete='off' onChange={this.handleChange} noValidate /><br />
							{errors.rule2.length > 0 &&
										<div class="alert alert-primary" role="alert">
											{errors.rule2}
										</div>}
						</div>
						<div className='form-group'>
							<label htmlFor="rule3">Rule #3</label>
									<input className="form-control" type='text' name='rule3' autoComplete='off' onChange={this.handleChange} noValidate /><br />
							{errors.rule3.length > 0 &&
										<div class="alert alert-primary" role="alert">
											{errors.rule3}
										</div>}
						</div>
						<div className='submit'>
							<button className="btn btn-primary">Create</button>
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