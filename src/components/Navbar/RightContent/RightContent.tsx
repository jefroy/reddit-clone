import React from 'react';
import {Flex} from "@chakra-ui/react";
import AuthButtons from "@/components/Navbar/RightContent/AuthButtons";

type RightContentProps = {
    // user: any;
};

const RightContent : React.FC<RightContentProps> = () => {
    return (
        <>
            {/*<AuthModal />*/}
            <Flex justify={"center"} align={"center"}> {/*center a div*/}
                <AuthButtons />
            </Flex>
        </>
    );
}

export default RightContent;
