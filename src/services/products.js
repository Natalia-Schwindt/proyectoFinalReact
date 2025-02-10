import { addDoc, collection } from "firebase/firestore";

import { db } from "../firebase/config";

export const createProduct = async (productData) => {
   
        const doc = await addDoc(collection(db, "productos"), {
            ...productData,
        });
        console.log("Document written with ID: ", doc.id);
        return doc
}