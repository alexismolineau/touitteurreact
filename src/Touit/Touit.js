import React, { Component } from 'react';
import TouitContent from './TouitContent';
import TouitFooter from './TouitFooter';
import TouitCollapse from './TouitCollapse';
import apiTouits from "../Utils/apiTouits";

class Touit extends Component {

    constructor(props){
        super(props);
        this.state = {
            displayComments: false,
            comments: [],
            error: null,
            commentsCounts: this.props.nbComments,
            likeCounts: this.props.nbLikes,
            image: ''
        }

    }

    componentDidMount =() => {
        apiTouits.getAvatar(this.props.pseudo)
            .then(
               result => {
                   console.log(result)
                   this.setState({image: result})}
            )
    }

    componentWillUnmount = () => {
        this.setState({displayComments: false});
    }

    handleDisplayCommentClick = () =>{
        this.getCommentsByMessageId(this.props.id);
    }

    getCommentsByMessageId = id => {
        apiTouits.getCommentsByMessage(id).then(
            result => this.setState(
                {
                    isLoaded: true,
                    comments: result.comments,
                    displayComments: !this.state.displayComments

                }
            )
        ).then(
            setTimeout(this.updateCommentsCount, 1000)
        )
    }



    updateCommentsLikesCount = () => {
        apiTouits.updateLikeOnComments(this.props.id).then(
            result =>  this.setState(
                {
                    isLoaded: true,
                    commentsCounts: result.data.comments_count,
                    likeCounts: result.data.likes
                }
            )
        )
    }




    render(){
        return (

            <div className="card col-12 mb-3" id={this.props.id} onMouseEnter={this.updateCommentsLikesCount}>
                <TouitContent pseudo={this.props.pseudo} message={this.props.message} image={this.state.image}/>
                <TouitFooter nbComments={this.state.commentsCounts} handleDisplayComments={this.handleDisplayCommentClick} getCommentsByMessageId={this.getCommentsByMessageId} id={this.props.id} updateCommentsCount={this.updateCommentsLikesCount} nbLikes={this.state.likeCounts} />
                <TouitCollapse displayComments={this.state.displayComments} comments={this.state.comments} isLoaded={this.state.isLoaded} id={this.props.id}/>
            </div>
        )
    }

}

export default Touit;