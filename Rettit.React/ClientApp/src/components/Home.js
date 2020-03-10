import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;
    async postData(){
        try {
            let result = await fetch('https://localhost:44365/api/users', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    Username: 'Matthijs',
                    Password: 'Abcd1234'
                })
            });
            console.log('Result' + result)
        } catch (e) {
            console.log(e)
        }
    }

  render () {
    return (
        <div>
            <button onClick={ this.postData }>Click here</button>
      </div>
    );
  }
}
