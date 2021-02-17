import React, { Component } from 'react';



const TouitContent = props => {
    return(
        <div className="card-body">
            <div className="card-title mb-2 text-muted h5">
                {props.pseudo}
            </div>
            <p className="card-text">{props.message}</p>
        </div>
    )
}

export default TouitContent;