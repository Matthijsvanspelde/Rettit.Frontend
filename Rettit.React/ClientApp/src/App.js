import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { RegisterForm } from './components/RegisterForm';
import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Route exact path='/register' component={RegisterForm} />
      </Layout>
    );
  }
}
