import React, { Component } from 'react';
import Button from '../Utils/Buttons/Button';
import TouitModal from './TouitModal/TouitModal';

class TouitFooter extends Component {



    constructor(props){
        super(props);
        this.state= {
            liked: false,
            likeContent: this.notLiked,
            displayModal : false,
            isLoaded: false,
            response: '',
            error: null
        }
        //bind
        this.addRemoveLike = this.addRemoveLike.bind(this);
    }

    liked = <span><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path></svg>({this.props.nbLikes + 1})</span>;

    notLiked = <span><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path></svg>({this.props.nbLikes})</span>;

    updateLikeContent = () =>{
        this.state.liked ? this.setState({
            likeContent: this.liked
        })
        :
        this.setState({
            likeContent: this.notLiked
        });
    }

    addRemoveLike = () =>{
        this.setState({liked: !this.state.liked}, () => {
            this.updateLikeContent();
            const data = new FormData();
            data.append('message_id', this.props.id);

            this.state.liked ? 
            this.putDeleteLike(`http://touiteur.cefim-formation.org/likes/send`, 'PUT')
            :
            this.putDeleteLike(`http://touiteur.cefim-formation.org/likes/remove`, 'DELETE');

        });
    }

    putDeleteLike = (url, method) => {

        const data = new FormData();
        data.append('message_id', this.props.id);

        const options = {
            method: method,
            body: data
        }
        fetch(url, options)
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
        })

    }


    handleDisplayModal = () => {
        this.setState(
            {
                displayModal: !this.state.displayModal
            }
        )
    }

    render(){
        return(
            <div className="card-footer bg-secondary">
                <div className="card-buttons">
                    <Button classList={'btn btn-light text-info'} content={this.state.likeContent} method={this.addRemoveLike}/>
                    <Button classList={'btn btn-info text-light'} content={'Commenter'} method={this.handleDisplayModal}/>
                    <TouitModal displayModal={this.state.displayModal} getCommentsByMessageId={this.props.getCommentsByMessageId} displayModalMethod={this.handleDisplayModal} updateCommentsCount={this.props.updateCommentsCount} id={this.props.id}/>
                </div>
                <div className="comments-container">
                    <Button classList={'display-comments btn btn-info text-light'} disabled={!this.props.nbComments} content={`Commentaires (${this.props.nbComments})`} method={this.props.handleDisplayComments}/>
                </div>
            </div>
        )
    }

}

export default TouitFooter;