import React, { Component } from 'react';

export class Search extends Component {

    render() {
        return (
            <div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Search Rettit" aria-describedby="button-addon2" />
                    <div class="input-group-append">
                    <button class="btn btn-primary" type="button" id="button-addon2">Search</button>
                    </div>
                </div>
            </div>
        );
    }
}