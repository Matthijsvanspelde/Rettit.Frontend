import React, { Component } from 'react';
import axios from 'axios';

export class SubForumGeneralInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        axios.get('https://localhost:44365/api/SubForums/' + id)
        .then(res => {
            console.log(res);
            console.log(res.data.name);
            this.setState(
                {
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
        <div className="jumbotron">
            <h1 className="display-4">r/{this.state.name}</h1>
            <p className="lead">{this.state.about}</p>
            <p>Rules:</p>
            <p>{this.state.rule1}</p>
            <p>{this.state.rule2}</p>
            <p>{this.state.rule3}</p>
            <a className="btn btn-primary btn-lg" href="#" role="button">Post something...</a>
            </div>
        </div>
        )
    }
}