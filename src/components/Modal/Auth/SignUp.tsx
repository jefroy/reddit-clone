import React, {useEffect, useState} from 'react';
import {Button, Flex, Input, Text} from "@chakra-ui/react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "@/atoms/authModalAtom";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth, firestore} from "@/firebase/clientApp";
import {FIREBASE_ERRORS} from "@/firebase/errors";
import {User} from "@firebase/auth";
import {addDoc, collection} from "@firebase/firestore";

const SignUp : React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState); // only need the set function here

    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        userError,
    ] = useCreateUserWithEmailAndPassword(auth);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (error){
            setError('');
        }
        if (signUpForm.password !== signUpForm.confirmPassword){
            setError("Passwords do not match!");
            return;
        }
        const res = await createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm(prev => ({
            ...prev, // spread the previous state so we can append to the state in the next line
            [event.target.name]: event.target.value, // email: typedIn@value.com , or password: bobpass
        }))
    };

    useEffect(() => {
        const createUserDocument = async (user: User) => {
            await addDoc(collection(firestore, "users"), JSON.parse(JSON.stringify(user)))
        }
        if (user) {
            const res = createUserDocument(user.user).catch(console.error)
        }
    }, [user])

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
            <Input
                isRequired={true}
                name={"confirmPassword"}
                placeholder={"confirmPassword"}
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
            {
                error || userError && ( // if error exists
                    <Text textAlign={"center"} color={"red"} fontSize={"10pt"}>
                        {error || FIREBASE_ERRORS[userError.message]}
                    </Text>
                )
            }
            <Button width={"100%"} height={"36px"} mt={2} mb={2} type={"submit"} isLoading={loading}>Sign Up</Button>
            <Flex
                fontSize={"9pt"}
                justifyContent={"center"}
            >
                <Text mr={1}>Already a redditor?</Text>
                <Text
                    color={"blue.500"}
                    fontWeight={700}
                    cursor={"pointer"}
                    onClick={() => {
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: 'login'
                        }))
                    }}
                >
                    LOG IN
                </Text>
            </Flex>
        </form>
    );

}

export default SignUp;
