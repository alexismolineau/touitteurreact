import React, {Component} from 'react';
import Button from '../Utils/Buttons/Button';
import Input from '../Utils/Input';
import Alert from '../Utils/Alert/Alert';
import apiTouits from "../Utils/apiTouits";


class NewTouitForm extends Component {


    constructor(props) {
        super(props);
        
        this.state = {
            isLoaded: false,
            isValid: false,
            error: null,
            response: '',
            nameValue: '',
            messageValue: '',
            validityMsg: '',
            displayAlert: true,
        }

    }


    handleClick = event => {
        event.preventDefault();
        this.addTouit(this.state.nameValue, this.state.messageValue);
    }

    addTouit = (name, message) => {
        this.handleDisplayState(true);
        if(this.state.nameValue === '' || this.state.messageValue === ''){
            this.setState({
            validityMsg: 'le pseudo et le touit ne peuvent être vides'})
            return;
        }else if (this.state.nameValue.length < 3 || this.state.nameValue.length > 16){
            this.setState({ validityMsg: 'le pseudo doit être compris entre 3 et 16 caractères'})
            return;
        }else if (this.state.messageValue.length < 3 || this.state.messageValue.length > 200){
            this.setState({  validityMsg: 'le touit doit faire entre 3 et 200 caractères'})
            return;
        }
        this.setState({isValid: true});
        this.makeApiPost(name, message);
    }


    makeApiPost = (name, message) => {
        return apiTouits.postTouit(name, message).then(
            result => this.setState({
                    response: result,
                    isLoaded: true,
                    validityMsg: 'Le touit a été soumis',
                    messageValue: '',
                    nameValue: ''
                })
        );
    }

    handleDisplayState = boolean => {
        this.setState({displayAlert: boolean})
    }

    getNameInputValue = value => {
        this.setState({
            nameValue: value
        });
    }

    getMessageInputValue = value => {
        this.setState({
                messageValue: value
            });
    } 


    render() {
        return (
        <form className='row align-items-center pb-3'>
                {this.state.isValid && this.state.isLoaded ? <Alert alertContent={this.state.validityMsg} classList={"alert alert-success"} handleDisplayState={this.handleDisplayState} display={this.state.displayAlert}/>  : <></>}
                {!this.state.isValid && this.state.validityMsg !== '' ? <Alert alertContent={this.state.validityMsg} classList={"alert alert-danger"} handleDisplayState={this.handleDisplayState} display={this.state.displayAlert}/> : <></>}
            <div className='row g-3 col-md-10 mb-3'>
                <Input inputType={'text'} inputId={'pseudo'} placeholder={'pseudo'} labelContent={'Pseudo'} inputClassList={'form-control'} maxLength={16} required={true} method={this.getNameInputValue} value={this.state.nameValue}/> 
                <Input inputType={'textarea'} inputId={'message'} placeholder={'message'} labelContent={'Message'} inputClassList={'form-control'} maxLength={256} required={true} method={this.getMessageInputValue} value={this.state.messageValue}/> 
            </div>
            <div className="col-md-2">
                <Button type={'button'} classList={'btn btn-info text-light'} disabled={false} content={'Envoyer'} method={this.handleClick}/>
            </div>
        </form>
        );
    }
}

export default NewTouitForm;