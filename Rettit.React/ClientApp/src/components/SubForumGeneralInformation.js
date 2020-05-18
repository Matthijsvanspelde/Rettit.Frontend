import React, { Component } from 'react';
import { PostForm } from './PostForm';
import { Posts } from './Posts';
import axios from 'axios';

export class SubForumGeneralInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SubForumId: null,
            name: null,
            about: null,
            rule1: null,
            rule2: null,
            rule3: null,
        };
    }
    
    componentDidMount() {       
        const { match } = this.props
        const id = match.params.id
        axios.get('https://rettitapi.azurewebsites.net/api/SubForums/' + id)
        .then(res => {
            console.log(res);
            console.log(res.data.name);
            this.setState(
                {
                    SubForumId: res.data.id,
                    name: res.data.name,
                    about: res.data.about,
                    rule1: res.data.rule1,
                    rule2: res.data.rule2,
                    rule3: res.data.rule3,
                }
            );
        }).catch(err => {
            console.log(err)
        });
    }
    
    render()
	{
        return (
        <div>
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">r/{this.state.name}</h5>
                    <p className="card-text">{this.state.about}</p>
                    <PostForm SubForumId={this.state.SubForumId} IsLoggedIn={this.props.IsLoggedIn}/>
                </div>
                </div><br />
                <Posts SubForumId={this.state.SubForumId}  />
        </div>
        )
    }
}