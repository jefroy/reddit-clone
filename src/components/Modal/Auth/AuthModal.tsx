// https://chakra-ui.com/docs/components/modal

import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, useDisclosure,
} from '@chakra-ui/react'
import {useRecoilState} from "recoil";
import {authModalState} from "@/atoms/authModalAtom";


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
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>wow</p>
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
