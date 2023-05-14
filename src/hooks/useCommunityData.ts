import { useEffect, useState } from "react";
import { doc, getDoc, increment, writeBatch } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import {
    communityState,
    defaultCommunity,
} from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { getMySnippets } from "@/helpers/firestore";
import {CommunitySnippet} from "@/firebase/models/CommunitySnippet";
import {Community} from "@/firebase/models/Community";
import {AppUser} from "@/firebase/models/AppUser";

// Add ssrCommunityData near end as small optimization
const useCommunityData = (ssrCommunityData?: boolean) => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [communityStateValue, setCommunityStateValue] =
        useRecoilState(communityState);
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user || !!communityStateValue.mySnippets.length) return;

        getSnippets();
    }, [user]);

    const getSnippets = async () => {
        setLoading(true);
        try {
            const snippets = await getMySnippets(user?.uid!);
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: snippets as CommunitySnippet[],
                initSnippetsFetched: true,
            }));
            setLoading(false);
        } catch (error: any) {
            console.log("Error getting user snippets", error);
            setError(error.message);
        }
        setLoading(false);
    };

    const getCommunityData = async (communityId: string) => {
        // this causes weird memory leak error - not sure why
        // setLoading(true);
        console.log("GETTING COMMUNITY DATA");

        try {
            const communityDocRef = doc(
                firestore,
                "communities",
                communityId as string
            );
            const communityDoc = await getDoc(communityDocRef);
            // setCommunityStateValue((prev) => ({
            //   ...prev,
            //   visitedCommunities: {
            //     ...prev.visitedCommunities,
            //     [communityId as string]: {
            //       id: communityDoc.id,
            //       ...communityDoc.data(),
            //     } as Community,
            //   },
            // }));
            setCommunityStateValue((prev) => ({
                ...prev,
                currentCommunity: {
                    id: communityDoc.id,
                    ...communityDoc.data(),
                } as Community,
            }));
        } catch (error: any) {
            console.log("getCommunityData error", error.message);
        }
        setLoading(false);
    };

    const onJoinLeaveCommunity = (community: Community, isJoined?: boolean) => {
        console.log("ON JOIN LEAVE", community.id);

        if (!user) {
            setAuthModalState({ open: true, view: "login" });
            return;
        }

        setLoading(true);
        if (isJoined) {
            leaveCommunity(community.id);
            return;
        }
        joinCommunity(community);
    };

    const joinCommunity = async (community: Community) => {
        console.log("JOINING COMMUNITY: ", community.id);
        try {
            const batch = writeBatch(firestore);

            // create new comm snip
            const newSnip = new CommunitySnippet(community.id, false);
            newSnip.imageURL = community.imageURL || "";

            // noinspection TypeScriptValidateTypes
            batch.set(
                doc(
                    firestore,
                    `${AppUser.COLLECTION_NAME}/${user?.uid}/${CommunitySnippet.COLLECTION_NAME}`,
                    community.id
                ),
                newSnip.toJSON()
            );

            // increment number of users in community
            batch.update(doc(firestore, Community.COLLECTION_NAME, community.id), {
                numberOfMembers: increment(1),
            });

            // perform batch writes
            await batch.commit();

            // Add current community to snippet to UI
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnip],
            }));
        } catch (error) {
            console.log("joinCommunity error", error);
        }
        setLoading(false);
    };

    const leaveCommunity = async (communityId: string) => {
        try {
            const batch = writeBatch(firestore);

            // remove comm snip from user
            batch.delete(
                doc(
                    firestore,
                    `${AppUser.COLLECTION_NAME}/${user?.uid}/${CommunitySnippet.COLLECTION_NAME}/${communityId}`
                )
            );

            // decrement the number of members in the comm
            batch.update(
                doc(
                    firestore,
                    Community.COLLECTION_NAME,
                    communityId
                ), {
                    numberOfMembers: increment(-1),
                }
            );

            await batch.commit();

            // update UI
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(
                    (item) => item.communityId !== communityId
                ),
            }));
        } catch (error) {
            console.log("leaveCommunity error", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        // if (ssrCommunityData) return;
        const { community } = router.query;
        if (community) {
            const communityData = communityStateValue.currentCommunity;

            if (!communityData.id) {
                getCommunityData(community as string);
                return;
            }
            // console.log("this is happening", communityStateValue);
        } else {
            /**
             * JUST ADDED THIS APRIL 24
             * FOR NEW LOGIC OF NOT USING visitedCommunities
             */
            setCommunityStateValue((prev) => ({
                ...prev,
                currentCommunity: defaultCommunity,
            }));
        }
    }, [router.query, communityStateValue.currentCommunity]);

    // console.log("LOL", communityStateValue);

    return {
        communityStateValue,
        onJoinLeaveCommunity,
        loading,
        setLoading,
        error,
    };
};

export default useCommunityData;
