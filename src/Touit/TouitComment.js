import React from 'react';

const TouitComment = props => {

    return(
        <div className="card">
            <div className="card-body">
                <div className="card-title mb-2 text-muted h5">
                    {props.commentPseudo}
                </div>
                <p className="card-text">{props.commentContent}</p>
            </div>
        </div>
    )

}


export default TouitComment;