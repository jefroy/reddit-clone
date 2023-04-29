import {firestore} from "@/firebase/clientApp";
import {addDoc, collection, FieldValue} from "@firebase/firestore";
import {User} from "@firebase/auth";
import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";

export class AppUser {
    id: string;
    createdAt: FieldValue;
    lastLoggedIn: FieldValue;
    authInfo: User;

    public static readonly COLLECTION_NAME = 'users';

    constructor(
        authInfo: User,
    ) {
        this.authInfo = authInfo;
    }

    async create() {
        try {
            const res = await addDoc(
                collection(firestore, AppUser.COLLECTION_NAME),
                {
                    createdAt: serverTimestamp(),
                    lastLoggedIn: serverTimestamp(),
                    authInfo: JSON.parse(JSON.stringify(this.authInfo))
                }
            )
            this.id = res.id;
            console.log(
                "✅APPUSER CREATE: ",
                (await getDoc(res)).data()
            )
        } catch (e) {
            console.error("❌APPUSER CREATE: ", e)
        }
    }

    async update() {
        try {
            const userDocRef = doc(
                firestore,
                AppUser.COLLECTION_NAME,
                this.authInfo.uid
            );

            const existingData = getDoc(userDocRef);

            let data = {
                ...existingData,
                lastLoggedIn: serverTimestamp(),
                authInfo: JSON.parse(JSON.stringify(this.authInfo))
            }

            const res = await setDoc(
                userDocRef,
                data,
                { merge: true }
            )

            console.log(
                "✅APPUSER update: ",
                res
            )
        } catch (e) {
            console.error("❌APPUSER update: ", e)
        }
    }

}
