import React, { useState, useEffect } from 'react';

const Badge = props => {

    const [classList, setClassList] = useState("badge bg-secondary col-auto m-2");

    useEffect(
        () => props.filter === props.badgeContent ? setClassList("badge bg-primary col-auto m-2") : setClassList("badge bg-secondary col-auto m-2"))

    return(
        <div className={classList} onClick={ () => {props.filterTouits(props.badgeContent)}}>
            {`#${props.badgeContent}`}
        </div>
    )
}

export default Badge;