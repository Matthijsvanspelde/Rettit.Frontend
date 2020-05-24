import React, { Component } from 'react';
import axios from 'axios';

const validateForm = (errors) => {
	let valid = true;
	Object.values(errors).forEach(
		(val) => val.length > 0 && (valid = false)
	);
	return valid;
}

export class PostForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			message: null,
			generalError: null,
			errors: {
				title: '',
				message: '',
				generalError: '',
			}
		};
	}

	handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = this.state.errors;

		switch (name) {
			case 'title':
				errors.title =
					value.length < 5
						? 'Title must be more than 5 characters long!'
						: '';
				break;
			case 'message':
				errors.message =
					value.length < 50
						? 'Message must be more than 50 characters long!'
						: '';
				break;
			default:
				break;
		}
		this.setState({ errors, [name]: value });
	}

	handleSubmit = (event) => {		
		event.preventDefault();
		event.preventDefault()
		axios.post('https://rettitapi.azurewebsites.net/api/posts', { 'Title': this.state.title, 'Message': this.state.message, 'SubForumId': this.props.SubForumId}, {
			mode: 'cors',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("token"),
			}
		}).then(res => {
			console.log(res);
			console.log(this.props.SubForumId);
		}).catch(err => {
			console.log(err);
		});
	}

	state = {
		isActive: false
	}

	handleShow = () => {
		this.setState({
			isActive: true
		})
	}

	handleHide = () => {
		this.setState({
			isActive: false
		})
	}

	render() {
		const { errors } = this.state;
		if (this.props.IsLoggedIn === true) {
			if (this.state.isActive) {
				return (
					<div>
						<div>
							<button className="btn btn-primary" onClick={this.handleShow}>Post something</button>
						</div>
						<div className="popup">
							<div className='form-wrapper' style={{ maxWidth: 700 }}>
								<h4>Post something</h4>
								<span style={{ color: "red" }} className='error'>{errors.generalError}</span>
								<form onSubmit={this.handleSubmit} noValidate >
									<div className='form-group'>
										<label htmlFor="name">Title</label>
										<input className="form-control" type='text' name='title' autoComplete='off' onChange={this.handleChange} noValidate />
										{errors.title.length > 0 &&
											<span style={{ color: "red" }} className='error'>{errors.title} </span>}
									</div>
									<div className='form-group'>
										<label htmlFor="about">Message</label>
										<textarea className="form-control" type='text' name='message' autoComplete='off' rows='10' onChange={this.handleChange} noValidate />
										{errors.message.length > 0 &&
											<span style={{ color: "red" }} className='error'>{errors.message} </span>}
									</div>
									<div className='submit'>
										<button style={{ marginRight: "5px" }} className="btn btn-primary" onClick={this.handleHide}>Cancel</button>
										<button className="btn btn-primary">Post</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				);
			} else {
				return (
					<div>
						<button className="btn btn-primary" onClick={this.handleShow}>Post something</button>
					</div>
				);
			}
		} else {
		return (
			<div className="alert alert-primary" role="alert">You have to be signed in to post on this subcommunity!</div>
		);
		}
				
	}
}