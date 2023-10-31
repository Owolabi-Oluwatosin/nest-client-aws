import React from 'react';
import { Button } from '@chakra-ui/react';

const ButtonComponent = (props) => {
    return (
        <Button
            className={props.buttonClass}
            onClick={props.onClick}
            colorScheme={props.colorScheme}
            size='md'
        >
            {props.buttonText}
        </Button>
    )
}

export default ButtonComponent;