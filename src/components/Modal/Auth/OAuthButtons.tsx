import React, {useEffect} from 'react';
import {Button, Flex, Image, Text} from "@chakra-ui/react";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {auth, firestore} from "@/firebase/clientApp";
import {doc, setDoc} from "firebase/firestore";
import {User} from "@firebase/auth";
import {AppUser} from "@/firebase/models/AppUser";

type OAuthButtonsProps = {};

const OAuthButtons : React.FC<OAuthButtonsProps> = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const createUserDocument = async (user: User) => {
        const appUser = new AppUser(user);
        await appUser.update();
    }

    useEffect(() => {
        if (user){
            createUserDocument(user.user).catch(console.error)
        }
    }, [user])

    return (
        <Flex direction="column" mb={4} width="100%">
            <Button
                variant="oauth"
                mb={2}
                onClick={() => signInWithGoogle()}
                isLoading={loading}
            >
                <Image src="/images/googlelogo.png" height="20px" mr={4} />
                Continue with Google
            </Button>
            <Button variant="oauth">Some Other Provider</Button>
            {error && (
                <Text textAlign="center" fontSize="10pt" color="red" mt={2}>
                    {error.message}
                </Text>
            )}
        </Flex>
    );
}

export default OAuthButtons;
