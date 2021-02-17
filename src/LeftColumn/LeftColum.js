import React, { Component } from 'react';
import Touit from '../Touit/Touit';

class LeftColumn extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            messages: [],
            ts: 0,
        }
    }

    componentDidMount = () => {
        fetch(`http://touiteur.cefim-formation.org/list?ts=${this.state.ts}`)
            .then(response => response.json())
            .then(result => {
                this.setState(
                    {
                        isLoaded: true,
                        messages: [...this.state.messages].concat(result.messages),
                        ts: result.messages.length > 0 ? result.messages[result.messages.length -1].ts : this.state.ts
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
            })
            .then(
                setTimeout(this.componentDidMount, 2000)
            );
    }



    render(){
        return (

            <div className="col-12 order-2 order-lg-1 col-lg-7 p-3 touits-list bg-light">
                <div className="container">
                    <h2>Touits récents</h2>
                    <div className="row text-start flex-column-reverse align-items-center justify-content-between">
                        {this.state.messages.map(
                            message => <Touit pseudo={message.name} message={message.message} id={message.id} key={message.id} nbComments={message.comments_count}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }

}

export default LeftColumn;