import React, {useEffect} from 'react';
import {GetServerSidePropsContext, NextPage} from "next";
import {auth, firestore} from "@/firebase/clientApp";
import {doc, getDoc} from "firebase/firestore";
import {Community} from "@/firebase/models/Community";
import safeJsonStringify from "safe-json-stringify";
import CommunityNotFound from "@/components/Community/NotFound";
import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Posts from "@/components/Post/Posts";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRecoilState} from "recoil";
import {communityState} from "@/atoms/communitiesAtom";

type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage: NextPage<CommunityPageProps> = ({ communityData }) => {
    const [user, loadingUser] = useAuthState(auth);

    const [communityStateValue, setCommunityStateValue] =
        useRecoilState(communityState);

    useEffect(() => {
        setCommunityStateValue((prev) => ({
            ...prev,
            currentCommunity: communityData,
        }));
    }, [communityData]);

    // Community was not found in the database
    if (!communityData) {
        return <CommunityNotFound />;
    }

    return (
        <>
            <Header communityData={communityData} />
            <PageContent>
                {/* Left Content */}
                <>
                    <CreatePostLink />
                    <Posts
                        communityData={communityData}
                        userId={user?.uid}
                        loadingUser={loadingUser}
                    />
                </>
                {/* Right Content */}
                <>
                    {/*<About communityData={communityData} />*/}
                </>
            </PageContent>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext){
    // get community data and pass it to the client
    try {
        const communityDocRef = doc(
            firestore,
            Community.COLLECTION_NAME,
            context.query.communityId as string
        );

        const communityDoc = await getDoc(communityDocRef);
        const communityData = JSON.parse(
            safeJsonStringify({
                id: communityDoc.id,
                ...communityDoc.data()
            })
        );
        console.log(communityData);
        return {
            props: {
                communityData: communityDoc.exists() ? communityData : "", // if doc found, return the data, otherwise return an empty string
            }
        }
    } catch (e) {
        // you can tell nextjs to send you to an error page here, check docs.
        console.error("SSR ERROR IN LOADING COMMUNITY PAGE:", e);
    }
}

export default CommunityPage;
