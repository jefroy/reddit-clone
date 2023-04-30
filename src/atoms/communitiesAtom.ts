import { atom } from "recoil";
import {CommunitySnippet} from "@/firebase/models/CommunitySnippet";
import {Community} from "@/firebase/models/Community";

interface CommunityState {
    [key: string]:
        | CommunitySnippet[]
        | { [key: string]: Community }
        | Community
        | boolean
        | undefined;
    mySnippets: CommunitySnippet[];
    initSnippetsFetched: boolean;
    visitedCommunities: {
        [key: string]: Community;
    };
    currentCommunity: Community;
}

export const defaultCommunity: Community = new Community(
    "", "", "public"
)

export const defaultCommunityState: CommunityState = {
    mySnippets: [],
    initSnippetsFetched: false,
    visitedCommunities: {},
    currentCommunity: defaultCommunity,
};

export const communityState = atom<CommunityState>({
    key: "communitiesState",
    default: defaultCommunityState,
});
