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
                            <button className="btn btn-primary">Search</button>
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