import React from 'react';
import {Button} from "@chakra-ui/react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "@/atoms/authModalAtom";

const AuthButtons : React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState); // global modal state
    return (
        <>
            <Button
                variant={"outline"}
                height={"28px"}
                display={{base: 'none', sm: 'flex'}}
                width={{base: '70px', md: '110px'}}
                mr={2}
                onClick={() => {
                    setAuthModalState({
                        open : true,
                        view: "login"
                    })
                }}
            >
                Log In
            </Button>

            <Button
                height={"28px"}
                display={{base: 'none', sm: 'flex'}}
                width={{base: '70px', md: '110px'}}
                mr={2}
                // onClick={() => {}}
            >
                Sign Up
            </Button>
        </>
    );
}

export default AuthButtons;
