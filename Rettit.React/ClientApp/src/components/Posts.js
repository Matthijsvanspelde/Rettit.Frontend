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
                        <li>/u: {comment.message}</li>
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
                        <div className="card-body">
                            <p>{comments}</p>
                        </div>
                        <div class="card-footer text-muted">
                            <form>
                                <input type="text" class="form-control" id="comment" placeholder="Comment..."></input>
                            </form>
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