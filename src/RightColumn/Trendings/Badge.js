import React, { Component } from 'react';

const Badge = props => {

    return(
        <div className="badge bg-secondary col-auto m-2">
            {`#${props.badgeContent}`}
        </div>
    )
}

export default Badge;