import React, {useEffect, useState} from 'react';
import {Community} from "@/firebase/models/Community";
import {getDocs, orderBy, query, where} from "firebase/firestore";
import {firestore} from "@/firebase/clientApp";
import {collection} from "@firebase/firestore";
import usePosts from "@/hooks/usePosts";
import {Post} from "@/atoms/postsAtom";
import PostItem from "@/components/Post/PostItem";

type PostsProps = {
    communityData: Community;
    userId?: string;
    loadingUser: boolean;
};

const Posts : React.FC<PostsProps> = ({ communityData, userId }) => {
    const [loading, setLoading] = useState(false);
    const {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost
    } = usePosts();

    const getPosts = async () => {
        try {
            // get posts for this community
            const postsQuery = query(
                collection(firestore, 'posts'),
                where("communityId", "==", communityData.id),
                orderBy("createdAt", "desc")
            );
            const postDocs = await getDocs(postsQuery);
            // store in posts state
            const posts = postDocs.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setPostStateValue((prev) => ({
                ...prev,
                posts: posts as Post[],
            }))
        } catch (e) {
            console.error(e)
        }
    };

    useEffect(() => {
        getPosts();
    })

    return (
        <>
            <h1>POSTS!</h1>
            {
                postStateValue.posts.map((item, idx) => {
                    return(
                        <PostItem
                            key={idx}
                            post={item}
                            userIsCreator={userId === item.creatorId}
                            userVoteValue={undefined}
                            onVote={onVote}
                            onDeletePost={onDeletePost}
                            onSelectPost={onSelectPost}
                        />
                    )
                })
            }
        </>
    );
}

export default Posts;
