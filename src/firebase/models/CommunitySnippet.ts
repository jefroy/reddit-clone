import {firestore} from "@/firebase/clientApp";

export class CommunitySnippet {
    communityId: string;
    isModerator: boolean;
    public static readonly COLLECTION_NAME = 'communitySnippets';

    constructor(
        communityId: string,
        isModerator: boolean,
    ) {
        this.communityId = communityId;
        this.isModerator = isModerator;
    }

    toJSON() {
        return {
            communityId: this.communityId,
            isModerator: this.isModerator,
        }
    }

}
