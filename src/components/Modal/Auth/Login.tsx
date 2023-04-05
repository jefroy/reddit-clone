import React, {useState} from 'react';
import {Button, Flex, Input, Text} from "@chakra-ui/react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "@/atoms/authModalAtom";

type LoginProps = {};

const Login : React.FC<LoginProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState); // only need the set function here

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    // todo: add firebase logic
    const onSubmit = () => {};

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(prev => ({
            ...prev, // spread the previous state so we can append to the state in the next line
            [event.target.name]: event.target.value, // email: typedIn@value.com , or password: bobpass
        }))
    };

    return (
        <form onSubmit={onSubmit}>
            {/*2 inputs*/}
            <Input
                isRequired={true}
                name={"email"}
                placeholder={"email"}
                type={"email"}
                mb={2}
                onChange={onChange}
                _placeholder={{ color: "grey.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                bg={"gray.50"}
            />
            <Input
                isRequired={true}
                name={"password"}
                placeholder={"password"}
                type={"password"}
                mb={2}
                onChange={onChange}
                _placeholder={{ color: "grey.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                bg={"gray.50"}
            />
            <Button width={"100%"} height={"36px"} mt={2} mb={2} type={"submit"}>Log In</Button>
            <Flex
                fontSize={"9pt"}
                justifyContent={"center"}
            >
                <Text mr={1}>New here?</Text>
                <Text
                    color={"blue.500"}
                    fontWeight={700}
                    cursor={"pointer"}
                    onClick={() => {
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: 'signup'
                        }))
                    }}
                >
                    SIGN UP
                </Text>
            </Flex>
        </form>
    );

}

export default Login;