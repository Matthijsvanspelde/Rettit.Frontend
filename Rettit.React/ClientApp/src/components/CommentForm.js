import React, { Component } from 'react';
import { Posts } from './Posts';
import axios from 'axios';

export class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: null,
			postId: null,
			errors: {
				message: '',
			},
		};
	}
	handleSubmit = event => {
		event.preventDefault();
		this.postCall()
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};

	postCall = () => {
		return axios.post(
			'https://localhost:44365/api/comment',
			{ message: this.state.message, PostId: this.props.PostId },
			{
				mode: 'cors',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			}
		);
	};

	handleChange = event => {
		// console.log(event);
		event.preventDefault();
		const { name, value } = event.target;
		// console.log(name, value);
		let errors = this.state.errors;

		switch (name) {
			case 'comment':
				errors.message = value.length < 5 ? 'Comment must be longer than 5 characters!' : '';
				break;
			default:
				break;
		}
		this.setState({ errors, [name]: value });
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} noValidate>
				<div className="input-group mb-3">
					<input
						className="form-control"
						type="text"
						placeholder="What are your thoughts?"
						name="message"
						onChange={this.handleChange}
						autoComplete="off"
						noValidate
					/>
					<div className="submit input-group-append">
						<button className="btn btn-primary">Comment</button>
					</div>
					{this.state.errors.message.length > 0 && (
						<span style={{ color: 'red' }} className="error">
							{this.state.errors.message}{' '}
						</span>
					)}
				</div>
			</form>
		);
	}
}
