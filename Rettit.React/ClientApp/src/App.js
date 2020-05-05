import React, { Component } from 'react';
import { Route, Router } from 'react-router';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Search } from './components/Search';
import { CreateSubForum } from './components/CreateSubForum';
import { SubForumGeneralInformation } from './components/SubForumGeneralInformation';
import './custom.css'
import './components/Form.css';
import './components/Popup.css';
import { Layout } from './components/Layout';
import * as jwtDecode from 'jwt-decode';

export default class App extends Component {
    static displayName = App.name;
	constructor(props) {
		super(props);
		this.state = {
			IsLoggedIn: null,
		};
	}

	IsLoggedIn() {
		let token = localStorage.getItem('token')
		if (token) {
			let tokenExpiration = jwtDecode(token).exp;
			let dateNow = new Date();
			if (tokenExpiration < dateNow.getTime() / 1000) {
				this.state.IsLoggedIn = false;
			} else {
				this.state.IsLoggedIn = true;
			}
		} else {
			this.state.IsLoggedIn = false;
		}
		console.log(this.state.IsLoggedIn);
	}

	render() {
		this.IsLoggedIn();
        return (
			<Layout>
				<Route exact path="/search" render={(props) => <Search IsLoggedIn={this.state.IsLoggedIn} {...props} />} />
				<Route exact path="/login" render={(props) => <Login IsLoggedIn={this.state.IsLoggedIn} {...props} />} />
				<Route exact path="/register" render={(props) => <Register IsLoggedIn={this.state.IsLoggedIn} {...props} />} />
				<Route exact path="/Create" render={(props) => <CreateSubForum IsLoggedIn={this.state.IsLoggedIn} {...props} />} />
				<Route exact path="/r/:id" render={(props) => <SubForumGeneralInformation IsLoggedIn={this.state.IsLoggedIn} {...props} />} />
            </Layout>
    );
  }
}
