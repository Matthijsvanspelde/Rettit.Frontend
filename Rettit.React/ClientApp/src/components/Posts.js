import React, { Component } from 'react';
import { CommentForm } from './CommentForm';
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
            axios.get('https://rettitapi.azurewebsites.net/api/Posts/' + this.props.SubForumId)
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
                        <div className="alert alert-secondary" role="alert" key={comment.id}>
                            <i>u/{comment.user.username} said:</i> {comment.message}
                        </div>
                    )
                });



                return (
                    <div key={post.id}>
                    <div className="card">
                        <div className="card-header">
                            
                            <cite title="Source Title">Posted by: u/{post.username}</cite>
                        </div>
                        <div className="card-body">
                            <h3>{post.title}</h3>
                            <p>{post.message}</p>                              
                        </div>
                            <div className="card-footer text-muted">
                                {comments}
                                <CommentForm PostId={post.id} />
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