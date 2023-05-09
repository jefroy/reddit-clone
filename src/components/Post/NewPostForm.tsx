import React, {useState} from 'react';
import {Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Icon} from "@chakra-ui/react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import PostTabItem from "./PostTabItem";
import TextInputs from "@/components/Post/PostForm/TextInputs";
import ImageUpload from "@/components/Post/PostForm/ImageUpload";
import {Post} from "@/atoms/postsAtom";
import {User} from "@firebase/auth";
import {serverTimestamp, updateDoc} from "firebase/firestore";
import {addDoc, collection} from "@firebase/firestore";
import {firestore, storage} from "@/firebase/clientApp";
import {getDownloadURL, ref, uploadString} from "@firebase/storage";
import {useRouter} from "next/router";

type NewPostFormProps = {
    communityId: string;
    communityImageURL?: string | null;
    user: User;
};

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

const NewPostForm : React.FC<NewPostFormProps> = (
    {
        communityId,
        communityImageURL,
        user,
    }
) => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
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
        // make new post object of type post
        const newPost: Post = {
            communityId: communityId as string,
            creatorId: user?.uid,
            creatorDisplayName: user.email!.split("@")[0],
            title: textInputs.title,
            body: textInputs.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp()
        };
        // store the post in db -> posts collection
        try {
            const postDocRef = await addDoc(
                collection(firestore, "posts"),
                newPost
            );

            // check if user added an image -> selectedFile != null
            if (selectedFile){
                const imageRef = ref(
                    storage,
                    `posts/${postDocRef.id}/image`
                );
                // store in bucket
                // important to perform this bucket step first, so we get the image url to put in the post document entry.
                await uploadString(imageRef, selectedFile, 'data_url');
                const downloadURL = await getDownloadURL(imageRef);
                // -> getDownloadURL (return image url to that image, this url will be stored in firestore)
                await updateDoc(postDocRef, {
                    imageURL: downloadURL,
                });
            }

            // redirect to the communityPage using the router
            router.back();
        } catch (e) {
            console.error(e)
            setError(true);
        }
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
            {
                error && (
                    <>
                        <Alert status='error'>
                            <AlertIcon />
                            {/*<AlertTitle>Your browser is outdated!</AlertTitle>*/}
                            <AlertDescription>Error Creating Post!.</AlertDescription>
                        </Alert>
                    </>
                )
            }
        </Flex>
    );
}

export default NewPostForm;
