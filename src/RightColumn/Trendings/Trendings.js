import React, { Component } from 'react';

import Badge from './Badge';

class Trendings extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            trendings: []
        }
    }

    componentDidMount = () => {
        this.getTrendings();
    }

    getTrendings = () => {
        fetch(`http://touiteur.cefim-formation.org/trending`)
        .then(response => response.json())
        .then(result => {
            this.setState(
                {
                    isLoaded: true,
                    trendings: Object.entries(result)
                }
            );
        },
        error => {
            this.setState(
                {
                    isLoaded: true,
                    error: error
                }
            )
        });
    }

    render(){
        return (
            <div className="row mb-3">
                <div className="col-12">
                    <h2>Trendings</h2>
                    <div className="row justify-content-around">
                    {this.state.trendings.map(
                        trending => trending[1] > 10 ? < Badge badgeContent={trending[0]} key={trending[0]} /> : null
                    )}
                    </div>
                </div>
            </div>
        )
    }

}

export default Trendings;