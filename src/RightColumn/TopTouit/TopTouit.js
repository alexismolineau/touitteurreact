import React, {Component} from 'react';
import Touit from '../../Touit/Touit';

class TopTouit extends Component{

    constructor(props){
        super(props);

        this.state = {
            topTouit: {},
            isLoaded: false,
            error: null
        }
    }

    getTopTouit = () => {
        fetch(`http://touiteur.cefim-formation.org/likes/top`)
        .then(response => response.json())
        .then(result => {
            this.setState(
                {
                    isLoaded: true,
                    topTouit: result.top[0]
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

    componentDidMount = () => {
        this.getTopTouit();
    }

    render(){
        return(
            <div className="row mb-3">
                <div className="col-12">
                    <h2>Top Touit</h2>
                    <div className="row top-touits">
                        {this.state.isLoaded ? < Touit pseudo={this.state.topTouit.name} message={this.state.topTouit.message} id={this.state.topTouit.id} nbComments={this.state.topTouit.comments_count} nbLikes={this.state.topTouit.likes}/> : null}
                    </div>
                </div>
            </div>

        )
    }
}

export default TopTouit;