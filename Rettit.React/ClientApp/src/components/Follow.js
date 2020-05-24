import React, { Component } from 'react';
import axios from 'axios';

export class Follow extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleSubmit = (event) => {

    }

    render()
    {
        if (this.props.IsLoggedIn) {
            return (
                <div>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <button className="btn btn-primary">Subscribe</button>
                    </form><br />
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
        
    }
}