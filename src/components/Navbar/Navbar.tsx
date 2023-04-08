import React from 'react';
import {Flex, Image} from "@chakra-ui/react";
import SearchInput from "@/components/Navbar/SearchInput";
import RightContent from "@/components/Navbar/RightContent/RightContent";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase/clientApp";

const Navbar : React.FC = () => {
    const [user, loading, error] = useAuthState(auth);

    return (
        // div with css flexbox
        <Flex
            bg={"white"}
            height={"44px"}
            padding={"6px 12px"}
        >
            <Flex align={"center"}>
                <Image alt={""} src={"/images/redditFace.svg"} height={"30px"} />
                <Image
                    alt={""} src={"/images/redditText.svg"}
                    height={"46px"} display={{ base: 'none', md: 'unset' }} // hide on small screens, show on medium+
                />
            </Flex>
            {/*<Directory />*/}
            <SearchInput />
            <RightContent user={user!} />
        </Flex>
    );
}

export default Navbar;
