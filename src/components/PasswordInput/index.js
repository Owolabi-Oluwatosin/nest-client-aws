import React from 'react';
import { 
    Input, 
    InputGroup,
    InputRightElement,
    Button,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const PasswordInputComponent = (props) =>{
    return (
        <InputGroup size='md'>
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
                }}
            />
            <InputRightElement width='4.rem'>
                <Button className='mr-1.5' h='1.75rem' size='sm' onClick={props.handleClick}>
                    {props.show ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}

export default PasswordInputComponent;