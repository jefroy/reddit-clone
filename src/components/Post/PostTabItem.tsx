import React from 'react';
import {TabItem} from "@/components/Post/NewPostForm";
import {Flex, Icon, Text} from "@chakra-ui/react";

type PostTabItemProps = {
    item: TabItem;
    selected: boolean;
    setSelectedTab: (value: string) => void;
};

const PostTabItem : React.FC<PostTabItemProps> = ({item, selected, setSelectedTab}) => {
    return (
        <Flex
            justify={"center"}
            align={"center"}
            flexGrow={1}
            p={"14px 0px"}
            cursor={"pointer"}
            _hover={{ bg: "gray.500" }}
            color={selected ? "blue.500" : "gray.500"}
            borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
            borderBottomColor={selected ? "blue.500" : "gray.200"}
            borderRightColor={"gray.200"}
            onClick={() => setSelectedTab(item.title)}
        >
            <Flex
                align={"center"}
                height={"20px"}
                mr={2}
            >

                <Icon as={item.icon}/>
            </Flex>
            <Text>{item.title}</Text>
        </Flex>
    );
}

export default PostTabItem;
