import React, { Component } from 'react';
import TouitComment from './TouitComment';

class TouitCollapse extends Component {

    constructor(props){
        super(props);

    }


    render(){
        return(
            this.props.displayComments && this.props.isLoaded ? <div className="collapse-comment">
                {
                this.props.comments.map(
                    comment => <TouitComment commentPseudo={comment.name} commentContent={comment.comment} key={comment.ts}/>
                )}
            </div>
            :
            <></>
        );
    }

}

export default TouitCollapse;