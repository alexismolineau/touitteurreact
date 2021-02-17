import React, { Component } from 'react';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

class TouitModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            isValid: null,
            validityMsg: '',
            error: null,
            response: '',
            nameValue: '',
            commentValue: '',
            displayAlert: true
        }
    }

    handleAddCommentClick = () =>{
        this.addComment(this.state.nameValue, this.state.commentValue, this.props.id);
    }

    addComment = (name, comment, id) => {
        this.setState({isValid: true});
        this.handleDisplayState(true);
        if(this.state.nameValue === '' || this.state.commentValue === ''){
            this.setState({ isValid: false,
            validityMsg: 'le pseudo et le commentaire ne peuvent être vides'})
            return;
        }else if (this.state.nameValue.length < 3 || this.state.nameValue.length > 16){
            this.setState({ isValid: false, validityMsg: 'le pseudo doit être compris entre 3 et 16 caractères'})
            return;
        }else if (this.state.commentValue.length < 3 || this.state.commentValue.length > 200){
            this.setState({ isValid: false, validityMsg: 'le commentaire doit faire entre 3 et 200 caractères'})
            return;
        }

        const data = new FormData();
        data.append('name', name);
        data.append('comment', comment);
        data.append('message_id', id);

        const options = {
            method: 'POST',
            body: data
        }
        fetch(`http://touiteur.cefim-formation.org/comments/send`, options)
        .then(response => response.json())
        .then(result => {
            this.setState(
                {
                    response: result,
                    isLoaded: true
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
        }).then(
            this.setState({validityMsg: 'Le commentaire a été soumis'})
        ).then(
            this.props.getCommentsByMessageId(this.props.id)
        ).then(
            this.setState({
                nameValue: '',
                commentValue: ''
            })
        ).then(
            this.props.updateCommentsCount()
        )
    }

    getNameInputValue = value => {
        this.setState({
            nameValue: value
        });
    }

    getCommentInputValue = value => {
        this.setState({
                commentValue: value
            });
    } 

    handleDisplayState = boolean => {
        this.setState({displayAlert: boolean})
    }

    

    render(){
        return(
            this.props.displayModal ? 
            <div className="modal fade show" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <ModalHeader displayModalMethod={this.props.displayModalMethod}/>
                        <ModalBody id={this.props.id} isValid={this.state.isValid} validityMsg={this.state.validityMsg} isLoaded={this.state.isLoaded} getNameInputValue={this.getNameInputValue} getCommentInputValue={this.getCommentInputValue} handleDisplayState={this.handleDisplayState} displayAlert={this.state.displayAlert} nameValue={this.state.nameValue} commentValue={this.state.commentValue}/>
                        <ModalFooter displayModalMethod={this.props.displayModalMethod} addCommentMethod={this.handleAddCommentClick}/>
                    </div>
                </div>
            </div>
            :
            <></>
        )
    }

}

export default TouitModal;