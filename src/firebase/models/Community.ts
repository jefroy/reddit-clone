import {firestore} from "@/firebase/clientApp";

export class Community {
    public static readonly COLLECTION_NAME = 'communities';

    id: string;
    createdAt: Date;
    creatorId: string;
    numberOfMembers: number;
    privacyType: string;
    imageURL?: string;

    constructor(
        createdAt: Date,
        creatorId: string,
        numberOfMembers: number,
        privacyType: string
    ) {
        this.createdAt = createdAt;
        this.creatorId = creatorId;
        this.numberOfMembers = numberOfMembers;
        this.privacyType = privacyType;
    }

}
