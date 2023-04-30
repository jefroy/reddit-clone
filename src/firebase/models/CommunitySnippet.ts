import {firestore} from "@/firebase/clientApp";

export class CommunitySnippet {
    communityId: string;
    isModerator: boolean;
    imageURL: string;

    public static readonly COLLECTION_NAME = 'communitySnippets';

    constructor(
        communityId: string,
        isModerator: boolean,
    ) {
        this.communityId = communityId;
        this.isModerator = isModerator;
        this.imageURL = "";
    }

    toJSON() {
        return {
            communityId: this.communityId,
            isModerator: this.isModerator,
            imageURL: this.imageURL,
        }
    }

}
