import React from 'react';
import {GetServerSidePropsContext} from "next";
import {firestore} from "@/firebase/clientApp";
import {doc, getDoc} from "firebase/firestore";
import {Community} from "@/firebase/models/Community";
import safeJsonStringify from "safe-json-stringify";
import CommunityNotFound from "@/components/Community/NotFound";

type indexProps = {
    communityData: Community;
};

const index : React.FC<indexProps> = ({ communityData }) => {

    if (!communityData){ // check for the empty string which should indicate that the community entered/from url query does not exist
        return (
            <CommunityNotFound />
        );
    }

    return (
        <div>
            Community Page : {communityData.id}
            <p>{JSON.stringify(communityData.createdAt)}</p>
            <p>{communityData.creatorId}</p>
            <p>{communityData.privacyType}</p>
            <p>{communityData.numberOfMembers}</p>
        </div>
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

export default index;
