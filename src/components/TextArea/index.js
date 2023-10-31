import { Textarea } from '@chakra-ui/react';
import React from 'react';

const TextArea = (props) => {
    return (
        <Textarea
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            variant={props.variant}
            className={props.inputClass}
            _focus={{
                outline: 'none',
                border: '1.5px solid #00acee'
            }}
        />
    )
}

export default TextArea;