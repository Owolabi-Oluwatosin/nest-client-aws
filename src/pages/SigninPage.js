import React, { useState } from "react";
import ButtonComponent from "../components/Button";
import Card from "../components/Card";
import InputComponent from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast, Text, Spinner } from "@chakra-ui/react";
import PasswordInputComponent from "../components/PasswordInput";
import { userLogin } from "../features/user/userActions";

const SigninPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const { loading, errorMessage } = useSelector((state) => state.user);

  const HandleEmail = (e) => {
    return setEmail(e.target.value);
  };
  const HandlePassword = (e) => {
    return setPassword(e.target.value);
  };

  //Toggle password to show/hide
  const handleClick = () => setShow(!show);

  const signIn = () => {
    console.log(email, password);
    const data = {
      email: email,
      password: password,
    };

    if (!data.email || !data.password) {
      toast({
        title: "Error message!",
        description: `All fields are required!`,
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    try {
      dispatch(userLogin(data)).then(() => {
        if (errorMessage) {
          toast({
            title: "Error message!",
            description: `${errorMessage}`,
            position: "top",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        }
        setEmail("");
        setPassword("");
        navigate("/");
      });
    } catch (error) {
      toast({
        title: "Error message!",
        description: `${error}`,
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <div className='flex justify-center mt-4 md:mt-12'>
      <div className='mx-8 md:mb-0 md:mt-0 mb-6 mt-4'>
        <Card className='w-full p-4 bg-white text-grey-600 rounded-md content-center shadow'>
          <Text fontSize='3xl' className='text-center mb-4'>
            Sign In
          </Text>
          <InputComponent
            inputClass='mb-6'
            placeholder='email'
            type='email'
            value={email}
            onChange={HandleEmail}
          />
          <PasswordInputComponent
            inputClass='mb-6'
            placeholder='password'
            type={show ? "text" : "password"}
            value={password}
            onChange={HandlePassword}
            show={show}
            handleClick={handleClick}
          />
          <ButtonComponent
            buttonText={loading ? <Spinner size='md' /> : "Sign In"}
            colorScheme='twitter'
            buttonClass='w-full py-5'
            onClick={signIn}
          />
          <div className='mt-6'>
            <span>
              You don't have an account?
              <Link to='/signup' className='text-[#00acee] py-5 pl-2'>
                Sign up
              </Link>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SigninPage;
