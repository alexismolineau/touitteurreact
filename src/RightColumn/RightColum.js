import React from 'react';

import Trendings from './Trendings/Trendings';

const RightColum = () => {

    return(
        <div className="col-12 order-1 order-lg-2 offset-lg-1 col-lg-4 p-3 mb-3 bg-light touits-side">
            <div className="container">
                < Trendings />
            </div>
        </div>
    )
}

export default RightColum;