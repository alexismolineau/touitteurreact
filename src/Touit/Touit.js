import React, { Component } from 'react';
import TouitContent from './TouitContent';
import TouitFooter from './TouitFooter';
import TouitCollapse from './TouitCollapse';

class Touit extends Component {

    constructor(props){
        super(props);
        this.state = {
            displayComments: false,
            comments: [],
            error: null,
            commentsCounts: this.props.nbComments
        }

        //binding
        this.handleDisplayCommentClick = this.handleDisplayCommentClick.bind(this);
    }

    handleDisplayCommentClick = () =>{
        this.getCommentsByMessageId(this.props.id);
    }

    getCommentsByMessageId = id => {
        fetch(`http://touiteur.cefim-formation.org/comments/list?message_id=${id}`)
        .then(response => response.json())
        .then(result => {
            this.setState(
                {
                    isLoaded: true,
                    comments: result.comments
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
            this.setState({
                displayComments: !this.state.displayComments
            })
        ).then(
            setTimeout(this.updateCommentsCount, 1000)
        )
    }



    updateCommentsCount = () => {
        fetch(`http://touiteur.cefim-formation.org/get?id=${this.props.id}`)
        .then(response => response.json())
        .then(result => {
            this.setState(
                {
                    isLoaded: true,
                    commentsCounts: result.data.comments_count
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
        )
    }



    render(){
        return (

            <div className="card col-12 mb-3" id={this.props.id}>
                <TouitContent pseudo={this.props.pseudo} message={this.props.message}/>
                <TouitFooter nbComments={this.state.commentsCounts} handleDisplayComments={this.handleDisplayCommentClick} getCommentsByMessageId={this.getCommentsByMessageId} id={this.props.id} updateCommentsCount={this.updateCommentsCount} nbLikes={this.props.nbLikes} />
                <TouitCollapse displayComments={this.state.displayComments} comments={this.state.comments} isLoaded={this.state.isLoaded} id={this.props.id}/>
            </div>
        )
    }

}

export default Touit;