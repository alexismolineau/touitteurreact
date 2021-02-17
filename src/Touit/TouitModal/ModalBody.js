import React, {useEffect, useState} from 'react';
import Input from '../../Utils/Input';
import Alert from '../../Utils/Alert/Alert';

const ModalBody = props => {



    return(
        <div className="modal-body">
            <form>
                <div className="row g-3 col-12">
                    {props.isValid && props.isLoaded ? <Alert alertContent={props.validityMsg} classList={"alert alert-success"} handleDisplayState={props.handleDisplayState} display={props.displayAlert}/>  : <></>}
                    {!props.isValid && props.validityMsg !== '' ? <Alert alertContent={props.validityMsg} classList={"alert alert-danger"} handleDisplayState={props.handleDisplayState} display={props.displayAlert}/> : <></>}
                    <Input inputType={"text"} inputClassList={'form-control'} inputId={`comment-pseudo-${props.id}`} maxLenght={16} required={true} labelContent={'Pseudo'} placeholder={'pseudo'} method={props.getNameInputValue} value={props.nameValue}/>
                    <Input inputType={"text"} inputClassList={'form-control'} inputId={`commentaire-${props.id}`} maxLenght={200} required={true} placeholder={'commentaire'} method={props.getCommentInputValue} value={props.commentValue}/>
                </div>
            </form>
        </div>
    )
}

export default ModalBody;

//<Alert alertContent={props.validityMsg} classList={"alert alert-danger"} />