import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { CreateSubForum } from './components/CreateSubForum';
import { SubForumGeneralInformation } from './components/SubForumGeneralInformation';
import './custom.css'
import './components/Form.css';
import './components/Popup.css';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/Create' component={CreateSubForum} />
            <Route exact path='/r/:id' component={SubForumGeneralInformation} />
      </Layout>
    );
  }
}
