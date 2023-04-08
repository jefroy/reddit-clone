import React from 'react';
import {Button, Flex} from "@chakra-ui/react";
import AuthButtons from "@/components/Navbar/RightContent/AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import {signOut} from "@firebase/auth";
import {auth} from "@/firebase/clientApp";

type RightContentProps = {
    user: any;
};

const RightContent : React.FC<RightContentProps> = ({ user }) => {
    return (
        <>
            <AuthModal />
            <Flex justify={"center"} align={"center"}> {/*center a div*/}
                {user ?
                    <Button
                        onClick={async () => {
                            await signOut(auth);
                        }}
                    >
                        Log Out
                    </Button>
                    :
                    <AuthButtons />
                }
            </Flex>
        </>
    );
}

export default RightContent;
