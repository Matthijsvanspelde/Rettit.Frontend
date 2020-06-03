import React, { Component } from 'react';
import { CommentForm } from './CommentForm';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class HomePosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        axios.get('https://localhost:44365/api/Home',
            {
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            })
            .then(res => {
                console.log(res.data)
                this.setState({ posts: res.data })
            }).catch(err => {
                console.log(err)
            });
    }


    render() {
        if (this.props.IsLoggedIn) {
            return (
                <div>
                    {this.state.posts.map((follow, index) =>
                        <div>

                            <div className="card" key={`Key${index}`}>
                                <div className="card-header">

                                    <cite title="Source Title">r/{follow.subForum.name}</cite>



                                </div>

                                {follow.subForum.posts.map((post, i) =>
                                    <div key={`Key${i}`}>
                                        <div className="card-body">
                                            <h3>{post.title}</h3>
                                            <p>{post.message}</p>
                                        </div>
                                        <div className="card-footer text-muted">
                                            {
                                                post.comments.map((comment, i) =>
                                                    <div key={`Key${i}`}>
                                                        <div className="alert alert-secondary" role="alert" key={comment.id}>
                                                            <i></i> {comment.message}
                                                        </div>

                                                    </div>



                                                )}
                                            <CommentForm PostId={post.id} />
                                        </div>
                                    </div>
                                )
                                }



                            </div><br />
                        </div>
                    )
                    }</div>


            );
        } else {
            return (
                <div>
                    

                <div class="alert alert-primary" role="alert">
                        You have to be signed in to view your favorite communities!
                </div>
                </div>
            );
        }
        
       
    }
}