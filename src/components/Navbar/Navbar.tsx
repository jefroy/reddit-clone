import React from 'react';
import {Flex, Image} from "@chakra-ui/react";
import SearchInput from "@/components/Navbar/SearchInput";

const Navbar : React.FC = () => {
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
            {/*<RightContent />*/}
        </Flex>
    );
}

export default Navbar;
