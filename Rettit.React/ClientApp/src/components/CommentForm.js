import React, { Component } from 'react';
import axios from 'axios';

export class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: null,
            postId: null,
            errors: {
                comment: '',
            }
        };
    }
    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://rettitapi.azurewebsites.net/api/Comment', this.state, this.props, {
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

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'comment':
                errors.comment =
                    value.length < 5
                        ? 'Comment must be longer than 5 characters!'
                        : '';
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value });
    }


    render() {       
        return (
            <form onSubmit={this.handleSubmit} noValidate>
                <div className="input-group mb-3">
                    <input className="form-control" type='text' placeholder='What are your thoughts?' name='query' onChange={this.handleChange} autoComplete='off' noValidate />
                    <div className='submit input-group-append'>
                        <button className="btn btn-primary">Comment</button>
                    </div>
                    {this.state.errors.comment.length > 0 &&
                        <span style={{ color: "red" }} className='error'>{this.state.errors.comment} </span>}
                </div>
            </form>
        )
    }
}