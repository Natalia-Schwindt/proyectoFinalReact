import { addDoc, collection } from "firebase/firestore";

import { db } from "../firebase/config";

export const createProduct = async (name, uid) => {
   
        const doc = await addDoc(collection(db, "productos"), {
            name,
            uid,
            isCompleted: false,
        });
        console.log("Document written with ID: ", doc.id);
        return doc
}