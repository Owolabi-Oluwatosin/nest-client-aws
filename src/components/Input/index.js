import React from 'react';
import { Input } from '@chakra-ui/react';

const InputComponent = (props) => {
    return (
        <Input
            className={props.inputClass}
            value={props.value}
            type={props.type}
            variant={props.variant}
            onChange={props.onChange}
            placeholder={props.placeholder}
            size='md'
            _focus={{
                outline: 'none',
                border: '1.5px solid #00acee'
            }} />
    )
}

export default InputComponent;