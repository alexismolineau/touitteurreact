import React from 'react';


const Alert = props =>{


    return(
        props.display &&
            <div className={props.classList} role="alert">
                {props.alertContent}
                <button type="button" className="btn-close" onClick={() => props.handleDisplayState(false)}></button>
            </div>
    )
}

export default Alert;

