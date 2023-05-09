import React, {useRef} from 'react';
import {Button, Flex, Image, Input, Stack, Textarea} from "@chakra-ui/react";

type ImageUploadProps = {
    selectedFile?: string;
    onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedTab: (value: string) => void;
    setSelectedFile: (value: string) => void;
};

const ImageUpload : React.FC<ImageUploadProps> = (
    {
        selectedFile,
        onSelectImage,
        setSelectedTab,
        setSelectedFile
    }
) => {

    const selectedFileRef = useRef<HTMLInputElement>(null); // for getting the selected file from HTML
    return (
        <Flex
            justify={"center"}
            align={"center"}
            width={"100%"}
        >
            {
                selectedFile ? (
                    <>
                        <Image
                            src={selectedFile}
                            maxWidth={"400px"}
                            maxHeight={"400px"}
                            alt={"img"}
                        />
                        <Stack direction={"row"} mt={4}>
                            <Button
                                height={"28px"}
                                onClick={() => setSelectedTab("Post")}
                            >Back to Post</Button>
                            <Button
                                variant={"outline"}
                                height={"28px"}
                                onClick={() => setSelectedFile("")}
                            >Remove</Button>
                        </Stack>
                    </>

                ) : (
                    <Flex
                        justify={"center"}
                        align={"center"}
                        width={"100%"}
                        p={20}
                        border={"1px dashed"}
                        borderColor={"gray.200"}
                        borderRadius={4}
                    >
                        <Button
                            variant={"outline"}
                            height={"28px"}
                            onClick={() => selectedFileRef.current?.click()} // open up the file input via the ref
                        >Upload</Button>
                        <input ref={selectedFileRef} type="file" hidden={true} onChange={onSelectImage} />
                        {/*<img src={selectedFile} alt=""/>*/}
                    </Flex>
                )
            }

        </Flex>
    );
}

export default ImageUpload;
