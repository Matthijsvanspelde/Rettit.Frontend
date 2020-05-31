import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            query: '',
        };
    }

	handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

    handleSubmit = (event) => {
        event.preventDefault();
        axios.get('https://rettitapi.azurewebsites.net/api/search/' + this.state.query)
            .then(res => {
                this.setState({ results: res.data })
            }).catch(err => {
                console.log(err)
            });
	}

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="input-group mb-3">
                        <input className="form-control" type='text' name='query' autoComplete='off' onChange={this.handleChange} noValidate />
                        <div className='submit input-group-append'>
                            <button className="btn btn-primary">
                                <svg class="bi bi-search" width="1.2em" height="1.2em" viewBox="0 0 16 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
                                    <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                                </svg>                               
                                </button>
                        </div>
                    </div>
                </form>

                {
                    this.state.results.map(function (searchResult, i) {
                        return <i key={i}>
                            <div className="card text-center">
                                <div className="card-body">
                                    <Link style={{ fontSize: 24 }} className="card-title text-dark" to={'/r/' + searchResult.name}>r/{searchResult.name}</Link>
                                    <p className="card-text">{searchResult.about}</p>
                                </div>
                            </div><br />
                        </i>
                    })
                }
            </div>
        );
    }
}