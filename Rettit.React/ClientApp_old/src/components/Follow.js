import React, { Component } from 'react';
import axios from 'axios';
import { FaBeer } from 'react-icons/fa';

export class Follow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribed: null,
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://localhost:44365/api/Follow', { 'SubForumId': this.props.SubForumId }, {
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

    handleSubmitUnsubscribe = (event) => {
        event.preventDefault();
        axios.delete('https://localhost:44365/api/Follow/' + this.props.SubForumId, {
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

    componentDidUpdate() {
        axios.get('https://localhost:44365/api/Follow/' + this.props.SubForumId,
        {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        })
        .then(res => {
            this.setState({ subscribed: res.data})
        }).catch(err => {
            console.log(err)
        });
    }

    render()
    {
        if (this.props.IsLoggedIn) {
            if (this.state.subscribed) {
                return (
                    <div className="action-btn">
                        <form onSubmit={this.handleSubmitUnsubscribe} noValidate>
                            <button className="btn btn-light">
                                <svg className="bi bi-check" width="1.3em" height="1.3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" />
                                </svg>
                                Subscribed
                                
                                </button>
                            
                        </form><br />
                    </div>
                );
            } else {
                return (
                    <div className="action-btn">
                        <form onSubmit={this.handleSubmit} noValidate>
                            <button className="btn btn-light">Subscribe</button>
                        </form><br />
                    </div>
                );
            }           
        } else {
            return (
                <div></div>
            );
        }
        
    }
}