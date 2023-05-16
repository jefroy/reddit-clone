import { atom } from "recoil";
import {Timestamp} from "@firebase/firestore";

export type Post ={
    userDisplayText? : string;
    id: string;
    communityId: string;
    creatorId: string;
    creatorDisplayName: string;
    title: string;
    body: string;
    numberOfComments: number;
    voteStatus: number;
    imageURL?: string;
    communityImageURL?: string;
    createdAt: Timestamp
}

export type PostVote = {
    id: string;
    postId: string;
    communityId: string;
    voteValue: number; // 1 for up, -1 for downvote
}

interface PostState {
    selectedPost: Post | null;
    posts: Post[];
    postVotes: PostVote[];
}

const defaultPostState: PostState = {
    selectedPost: null,
    posts: [],
    postVotes: [],
};

export const postState = atom<PostState>({
    key: "postState",
    default: defaultPostState
});
