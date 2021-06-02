import React, { Component } from 'react';
import Badge from './Badge';
import apiTouits from "../../Utils/apiTouits";

class Trendings extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            trendings: [],
            badgeClicked: false
        }
    }

    componentDidMount = () => {
        this.makeApiTrengindsCall();
    }

    makeApiTrengindsCall = () => {
        apiTouits.getTrendings().then(
            result => this.setState(
                {
                    isLoaded: true,
                    trendings: Object.entries(result)
                }
            )
        )
    }




    render(){
        return (
            <div className="row mb-3">
                <div className="col-12">
                    <h2>Trendings</h2>
                    <div className="row justify-content-around">
                    {this.state.trendings.map(
                        trending => trending[1] > 10 ? < Badge badgeContent={trending[0]} key={trending[0]} filterTouits={this.props.filterTouits} filter={this.props.filter}/> : null
                    )}
                    </div>
                </div>
            </div>
        )
    }

}

export default Trendings;