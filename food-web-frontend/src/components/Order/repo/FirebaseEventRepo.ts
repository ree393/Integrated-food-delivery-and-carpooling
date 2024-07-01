import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import type { IOrderRepo } from "./IOrderRepo";
import type { IOrder } from "../models/IOrder";
import { db, storage } from "../../../config/FirebaseConfig.ts";

export class FirebaseOrderRepo implements IOrderRepo {
    private collection = "orders";

    async saveOrder(event: IOrder): Promise<boolean> {
        const ref = doc(collection(db, this.collection));
        event.id = ref.id;
        return setDoc(ref, event)
            .then(() => {
                return true;
            })
            .catch((e) => {
                console.log(e);
                return false;
            });
    }

    async updateOrder(event: IOrder): Promise<boolean> {
        const ref = doc(collection(db, this.collection), event.id);
        return setDoc(ref, event)
            .then(() => true)
            .catch((e) => {
                console.log(e);
                return false;
            });
    }
    async deleteOrder(event: IOrder): Promise<boolean> {
        return deleteDoc(doc(db, this.collection, event.id))
            .then(() => {
                console.log("product Deleted");

                return true;
            })
            .catch((error) => {
                console.log("error occur" + error);
                return false;
            });
    }

    async ListOrder(): Promise<IOrder[]> {
        const events: IOrder[] = [];
        try {
            let data = await getDocs(collection(db, this.collection));
            if (data.docs.length === 0) return [];
            data.docs.forEach((doc) => {
                events.push(doc.data() as IOrder);
            });
            return events;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async imageToUrl(title: string, imageFile: File) {
        var storageRef = ref(storage, "/orders-images/" + title + imageFile.name);

        //Upload file
        var task = uploadBytesResumable(storageRef, imageFile);

        //Update progress bar

        const unsubscribe = task.on(
            "state_changed",
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(percentage);
                
            },
            function error(err) {
                console.error(err);
            }
        );

        await task;
        unsubscribe();
        let url = await getDownloadURL(task.snapshot.ref);
        return url;
    }

    async getOrderById(id: string) {
        return getDocs(query(collection(db, this.collection), where("id", "==", id)))
            .then(({ docs }) => {
                return docs[0].data() as IOrder;
            })
            .catch((e) => {
                console.error(e);
                return null;
            });
    }
}
