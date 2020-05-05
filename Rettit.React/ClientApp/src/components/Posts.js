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
            {this.state.posts.map(function (post) {

                var comments = post.comments.map(function (comment) {
                    return (
                        <div class="alert alert-secondary" role="alert">
                            <i>u/{comment.user.username} said:</i> {comment.message}
                        </div>
                    )
                });



                return (
                <div>
                    <div className="card">
                        <div className="card-header">
                            
                            <cite title="Source Title">Posted by: u/{post.username}</cite>
                        </div>
                        <div className="card-body">
                            <h3>{post.title}</h3>
                            <p>{post.message}</p>                              
                        </div>
                            <div class="card-footer text-muted">
                                <p>{comments}</p>
                                <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="What are your thoughts?" aria-describedby="button-addon2"/>
                                <div class="input-group-append">
                                <button class="btn btn-primary" type="button" id="button-addon2">Comment</button>
                                </div>
                            </div>
                        </div>
                    </div><br />
                </div>
                )
            })
            }
            </div>
        )
    }
}