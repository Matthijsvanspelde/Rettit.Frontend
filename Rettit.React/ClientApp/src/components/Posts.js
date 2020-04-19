import React, { Component } from 'react';
import axios from 'axios';

export class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            posts: [],
        };
    }

    componentDidUpdate() {
        if (this.props.SubForumId !== this.state.id) {           
            axios.get('https://localhost:44365/api/Posts/' + this.props.SubForumId)
                .then(res => {
                    console.log(res.data)
                    this.setState({ posts: res.data })
                }).catch(err => {
                    console.log(err)
                });
            this.state.id = this.props.SubForumId;
        }       
    }

    render() {
        return (
        <div>
            {this.state.posts.map(post => (
                <div key={post.id}>
                <div className="card">
                    <div className="card-header">
                        {post.title}
                    </div>
                    <div className="card-body">
                        <p>{post.message}</p>
                        <cite title="Source Title">u/{post.username}</cite>
                    </div>
                </div><br />
            </div>
            ))}
        </div>
        )
    }
}