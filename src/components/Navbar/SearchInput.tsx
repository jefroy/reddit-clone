import React from 'react';
import {Flex, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {User} from "@firebase/auth";

type SearchInputProps = {
    user?: User | null;
};

const SearchInput : React.FC<SearchInputProps> = () => {
    return (
        <Flex
            flexGrow={1}
            mr={2}
            align={"center"}
        > { /* take up all space avail, margin right */ }
            {/* https://chakra-ui.com/docs/components/input */}
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='gray.300' mb={1} />
                </InputLeftElement>
                <Input
                    placeholder='Search Reddit' fontSize={"10pt"}
                    height={"34px"} bg={"grey.50"}
                    _placeholder={{color: "grey.500"}}
                    _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500"
                    }}
                    _focus={{
                        outline: "none",
                        border: '1px solid',
                        borderColor: "blue.500"
                    }}
                />
            </InputGroup>
        </Flex>
    );
}

export default SearchInput;
