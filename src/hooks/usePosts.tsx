import {useRecoilState} from "recoil";
import {Post, postState} from "@/atoms/postsAtom";
import {deleteObject, ref} from "@firebase/storage";
import {firestore, storage} from "@/firebase/clientApp";
import {deleteDoc, doc} from "firebase/firestore";

const usePosts = (ssrCommunityData?: boolean) => {
    const [postStateValue, setPostStateValue] = useRecoilState(postState);

    const onVote = async () => {

    };

    const onSelectPost = () => {

    };

    const onDeletePost = async (post: Post): Promise<boolean> => {
        try {
            // 1. delete img if possible
            if (post.imageURL){
                const imageRef = ref(storage, `posts/${post.id}/image`);
                await deleteObject(imageRef);
            }
            // 2. delete post from db
            const postDocRef = doc(firestore, 'posts', post.id);
            await deleteDoc(postDocRef);
            // 3. update posts atom to update UI
            setPostStateValue(prev => ({
                ...prev,
                posts: prev.posts.filter(item => item.id !== post.id)
            }))
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost,
    };
};

export default usePosts;
