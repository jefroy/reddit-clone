// https://chakra-ui.com/docs/components/modal

import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, useDisclosure, Flex, Text,
} from '@chakra-ui/react'
import {useRecoilState} from "recoil";
import {authModalState} from "@/atoms/authModalAtom";
import AuthInputs from "@/components/Modal/Auth/AuthInputs";
import OAuthButtons from "@/components/Modal/Auth/OAuthButtons";


const AuthModal : React.FC = () => {
    // this is global
    const [modalState, setModalState] = useRecoilState(authModalState);
    // close the modal
    const handleClose = () => {
        setModalState(prev => ({
            ...prev,
            open: false,
        }))
    }

    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>
                        {modalState.view === 'login' && 'Login'}
                        {modalState.view === 'signup' && 'Sign Up'}
                        {modalState.view === 'resetPassword' && 'Reset Password'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Flex
                            direction={"column"}
                            align={"center"}
                            justify={"center"}
                            width={"70%"}
                            pb={6}
                            // border={"1px solid red"}
                        >
                            {/*oauth buttons*/}
                            <OAuthButtons />
                            <Text color={"gray.500"} fontWeight={700}>OR</Text>
                            <AuthInputs />
                            {/*<ResetPassword />*/}
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AuthModal;
