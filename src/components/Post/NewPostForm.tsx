import React, {useState} from 'react';
import {Flex, Icon} from "@chakra-ui/react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import PostTabItem from "./PostTabItem";
import TextInputs from "@/components/Post/PostForm/TextInputs";
import ImageUpload from "@/components/Post/PostForm/ImageUpload";

type NewPostFormProps = {};

const formTabs = [
    {
        title: 'Post',
        icon: IoDocumentText,
    },
    {
        title: 'Images & Video',
        icon: IoImageOutline,
    },
    {
        title: 'Link',
        icon: BsLink45Deg,
    },
    {
        title: 'Poll',
        icon: BiPoll,
    },
    {
        title: 'Talk',
        icon: BsMic,
    },
]

export type TabItem = {
    title: string;
    // noinspection JSAnnotator
    icon: typeof Icon.arguments;
};

const NewPostForm : React.FC<NewPostFormProps> = () => {
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [loading, setLoading] = useState(false);
    const [textInputs, setTextInputs] = useState({
        title: "",
        body: "",
    });
    const [selectedFile, setSelectedFile] = useState<string>();

    /**
     * form comps
     * 1. handleCreatePost
     * 2. onSelectImage
     * 3. onTextChange
     */

    const handleCreatePost = async () => {

    };
    const onSelectImage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const reader = new FileReader();
        if (event.target.files?.[0]){
            reader.readAsDataURL(event.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result){
                setSelectedFile(readerEvent.target?.result as string);
            }
        }
    };
    const onTextChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {
            target: {name, value},
        } = event; // wtf is this syntax

        setTextInputs(prev => ({
            ...prev,
            [name]: value, // wtf is this syntax
        }))
    };


    return (
        <Flex
            direction={'column'}
            bg={'white'}
            borderRadius={4}
            mt={2}
        >
            <Flex
                width={"100%"}
            >
                {
                    formTabs.map((item, idx) => {
                        return(
                            <PostTabItem
                                key={idx}
                                item={item}
                                selected={item.title === selectedTab}
                                setSelectedTab={setSelectedTab}
                            />
                        )
                    })
                }
            </Flex>
            <Flex>
                {
                    selectedTab === "Post" && (
                        <TextInputs
                            textInputs={textInputs}
                            onChange={onTextChange}
                            handleCreatePost={handleCreatePost}
                            loading={loading}
                        />
                    )
                }
                {
                    selectedTab === "Images & Video" && (
                        <ImageUpload
                            selectedFile={selectedFile}
                            onSelectImage={onSelectImage}
                            setSelectedTab={setSelectedTab}
                            setSelectedFile={setSelectedFile}
                        />
                    )
                }
            </Flex>
        </Flex>
    );
}

export default NewPostForm;
