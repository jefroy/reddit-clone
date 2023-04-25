import React, { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    Text
} from "@chakra-ui/react";
import {RiHomeSmileFill} from "react-icons/ri";

const Directory: React.FC = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    return (
        <Menu>
            <>
                <MenuButton
                    cursor="pointer"
                    padding="0px 6px"
                    borderRadius="4px"
                    _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
                    mr={2}
                    ml={{ base: 0, md: 2 }}
                >
                    <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        width={{ base: "auto", lg: "200px" }}
                    >
                        <Flex alignItems="center">
                            <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={RiHomeSmileFill} />
                            <>
                                <Box
                                    display={{ base: "none", lg: "flex" }}
                                    flexDirection="column"
                                    fontSize="10pt"
                                >
                                    <Text fontWeight={600}>
                                        Home
                                    </Text>
                                </Box>
                            </>
                        </Flex>
                        <ChevronDownIcon color="gray.500" />
                    </Flex>
                </MenuButton>
                <MenuList maxHeight="300px" overflow="scroll" overflowX="hidden">
                    {/*<Communities />*/}
                </MenuList>
            </>
        </Menu>
    );
};
export default Directory;
