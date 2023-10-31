import React, { Fragment } from 'react';

const Card = (props) => {
    return (
        <Fragment>
            <div className={props.className}>
                {props.children}
            </div>
        </Fragment>
    )
}

export default Card;