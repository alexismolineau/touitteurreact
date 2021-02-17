import React from 'react';
import Button from '../../Utils/Buttons/Button';

const ModalFooter = props => {

    return(
        <div className="modal-footer">
            <Button classList={'btn btn-danger'} submit={'button'} method={props.displayModalMethod} content={'Annuler'}/>
            <Button classList={'btn btn-info text-light'} submit={'button'} content={'Commenter'} method={props.addCommentMethod}/>
        </div>
    )

}

export default ModalFooter;