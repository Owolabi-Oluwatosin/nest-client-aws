import React, { useState } from "react";
import ButtonComponent from "../components/Button";
import Card from "../components/Card";
import InputComponent from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useToast, Text, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import PasswordInputComponent from "../components/PasswordInput";
import { registerUser } from "../features/user/userActions";
import { checkEmail, checkName } from "../Check/check";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { loading, error, errorMessage } = useSelector((state) => state.user);

  const handleClick = () => setShow(!show);

  const handleFirstName = (e) => {
    return setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    return setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    return setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    return setPassword(e.target.value);
  };

  const signUp = () => {
    if (!firstName || !lastName || !email || !password) {
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
    if (password.length <= 8) {
      toast({
        title: "Error message!",
        description: `Password must be more than 8 characters`,
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (!checkEmail().test(email)) {
      toast({
        title: "Error message!",
        description: `Invalid email`,
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (!checkName().test(firstName) || !checkName().test(lastName)) {
      toast({
        title: "Error message!",
        description: `You can only register name within 2 -30 character or without special character`,
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const data = {
      firstName: firstName
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" "),
      lastName: lastName
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" "),
      email: email,
      password: password,
    };
    try {
      dispatch(registerUser(data)).then(() => {
        if (error === true && errorMessage) {
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
        toast({
          title: `Signup successfully`,
          description: `Account created successfully`,
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        navigate("/signin");
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
          <Text fontSize='3xl' className='text-center'>
            Sign Up
          </Text>
          <div className='flex'>
            <InputComponent
              placeholder='first name'
              type='text'
              value={firstName}
              onChange={handleFirstName}
              inputClass='mb-4'
            />
            <InputComponent
              placeholder='last name'
              type='text'
              value={lastName}
              onChange={handleLastName}
              inputClass='mb-4 ml-4'
            />
          </div>
          <InputComponent
            placeholder='email'
            type='email'
            value={email}
            onChange={handleEmail}
            inputClass='mb-4'
          />
          <PasswordInputComponent
            placeholder='password'
            type={show ? "text" : "password"}
            value={password}
            onChange={handlePassword}
            inputClass='mb-4'
            show={show}
            handleClick={handleClick}
          />
          <ButtonComponent
            colorScheme='twitter'
            buttonText={loading ? <Spinner size='md' /> : "Sign Up"}
            buttonClass={`w-full py-5 ${
              loading &&
              "cursor-not-allowed focus:outline-none disabled:opacity-75"
            }`}
            onClick={signUp}
          />
          <span className='block mt-8'>
            You already have an account?
            <Link to='/signin' className='text-[#00acee] pl-2'>
              Sign In
            </Link>
          </span>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
