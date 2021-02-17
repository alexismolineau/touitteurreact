import React, { Component } from 'react';


class Button extends Component{


    constructor(props){
        super(props);
    }

    render() {
        return(
            <button 
            type={this.props.submit}
            className={this.props.classList}
            disabled={this.props.disabled}
            onClick = {this.props.method}
            >
                {this.props.content}
            </button>
        );
    }
}

export default Button;