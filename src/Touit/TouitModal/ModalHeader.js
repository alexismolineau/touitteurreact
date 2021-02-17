import React, { Component } from 'react';
import Button from '../../Utils/Buttons/Button';

const ModalHeader = props => {
    
    return(
        <div className="modal-header">
            <h5 className="modal-title">Ajouter un commentaire</h5>
            <Button classList={"btn-close"} submit={"button"} method={props.displayModalMethod}/>
        </div>
    )

}

export default ModalHeader;