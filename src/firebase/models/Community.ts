import {firestore} from "@/firebase/clientApp";
import {doc, runTransaction, serverTimestamp} from "firebase/firestore";
import {FieldValue} from "@firebase/firestore";
import {AppUser} from "@/firebase/models/AppUser";
import {CommunitySnippet} from "@/firebase/models/CommunitySnippet";

export class Community {
    public static readonly COLLECTION_NAME = 'communities';

    id: string;
    createdAt?: FieldValue;
    creatorId: string;
    numberOfMembers: number;
    privacyType: string;
    imageURL?: string;
    name: string;

    constructor(
        name: string,
        creatorId : string,
        privacyType : string
    ) {
        this.name = name;
        this.creatorId = creatorId;
        this.privacyType = privacyType;
        this.id = "";
        this.imageURL = "";
        this.numberOfMembers = 0;
    }

    async createWithUser(){
        // Create community document and communitySnippet subcollection document on user
        const communityDocRef = doc(firestore, "communities", this.name);
        await runTransaction(firestore, async (transaction) => {
            const communityDoc = await transaction.get(communityDocRef);
            if (communityDoc.exists()) {
                throw new Error(`Sorry, /r${this.name} is taken. Try another.`); // error.message underneath
            }

            // create community
            transaction.set(communityDocRef, {
                creatorId: this.creatorId,
                createdAt: serverTimestamp(),
                numberOfMembers: 1,
                privacyType: this.privacyType,
            });
            // create communitySnippet on user
            const newCommDoc = doc(
                firestore,
                `${AppUser.COLLECTION_NAME}/${this.creatorId}/${CommunitySnippet.COLLECTION_NAME}`,
                this.name
            );
            const commSnippet = new CommunitySnippet(this.name, true);
            transaction.set(
                newCommDoc,
                commSnippet.toJSON()
            );
        }); // end transaction
    }

}
