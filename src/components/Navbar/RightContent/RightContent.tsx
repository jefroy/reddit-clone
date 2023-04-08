import React from 'react';
import {Flex} from "@chakra-ui/react";
import AuthButtons from "@/components/Navbar/RightContent/AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import {User} from "@firebase/auth";
import ActionIcons from "@/components/Navbar/RightContent/Icons";
import MenuWrapper from "@/components/Navbar/RightContent/ProfileMenu/MenuWrapper";

type RightContentProps = {
    user?: User | null;
};

const RightContent : React.FC<RightContentProps> = ({ user }) => {
    return (
        <>
            <AuthModal />
            <Flex justify={"center"} align={"center"}> {/*center a div*/}
                {user ?
                    <ActionIcons />
                    :
                    <AuthButtons />
                }
                <MenuWrapper />
            </Flex>
        </>
    );
}

export default RightContent;
