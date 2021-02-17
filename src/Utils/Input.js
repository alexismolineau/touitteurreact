import React, { Component } from 'react';

class Input extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
    }

    handleInputChange = event => {
        this.props.method(event.target.value)
    }


    render() {
        return (
            <div className="col-12">
                {this.props.inputType === 'text' ? 
                <div className='input-group'>
                    <label htmlFor={this.props.inputId} className='input-group-text'>{this.props.labelContent}</label>
                    <input value={this.props.value} type={this.props.inputType} className={this.props.inputClassList} id={this.props.inputId} aria-describedby={this.props.inputId} placeholder={this.props.placeholder} maxLength={this.props.maxLength} required={this.props.required} onInput={this.handleInputChange}/>
                </div>
                    :
                <div className='input-group'>
                    <span className='input-group-text'>{this.props.labelContent}</span>
                    <textarea className={this.props.inputClassList} id={this.props.inputId} placeholder={this.props.placeholder} maxLength={this.props.maxLength} required={this.props.required} value={this.props.value} onInput={this.handleInputChange}></textarea>
                </div>}
            </div>
        )
    }

}

export default Input;