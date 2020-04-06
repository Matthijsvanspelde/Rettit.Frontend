import React, { Component } from 'react';
import axios from 'axios';

export class CreateSubForum extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			about: null,
			rule1: null,
			rule2: null,
			rule3: null,
			errors: {
				name: '',
				about: '',
				rule1: '',
				rule2: '',
				rule3: '',
			}
		};
	}

	handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = this.state.errors;
		this.setState({ errors, [name]: value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
			event.preventDefault()
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
			});		
	}

	render() {
		return (
			<div className='wrapper'>
				<div className='form-wrapper'>
					<h4>Create a subforum</h4>
					<form onSubmit={this.handleSubmit} noValidate >
						<div className='form-group'>
							<label htmlFor="name">Name</label>
							<input className="form-control" type='text' name='name' autoComplete='off' onChange={this.handleChange} noValidate />
						</div>
						<div className='form-group'>
							<label htmlFor="about">About</label>
							<textarea className="form-control" type='text' name='about' autoComplete='off' rows='3' onChange={this.handleChange} noValidate />
						</div>
						<div className='form-group'>
							<label htmlFor="rule1">Rule 1</label>
							<input className="form-control" type='text' name='rule1' autoComplete='off' onChange={this.handleChange} noValidate />
						</div>
						<div className='form-group'>
							<label htmlFor="rule2">Rule 2</label>
							<input className="form-control" type='text' name='rule2' autoComplete='off' onChange={this.handleChange} noValidate />
						</div>
						<div className='form-group'>
							<label htmlFor="rule3">Rule 3</label>
							<input className="form-control" type='text' name='rule3' autoComplete='off' onChange={this.handleChange} noValidate />
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