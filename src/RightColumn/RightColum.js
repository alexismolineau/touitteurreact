import React from 'react';

import Trendings from './Trendings/Trendings';
import TopTouit from './TopTouit/TopTouit';

const RightColum = props => {

    return(
        <div className="col-12 order-1 order-lg-2 offset-lg-1 col-lg-4 p-3 mb-3 bg-light touits-side">
            <div className="container">
                < Trendings filterTouits={props.filterTouits} filter={props.filter}/>
                < TopTouit />
            </div>
        </div>
    )
}

export default RightColum;