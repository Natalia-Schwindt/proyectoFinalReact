import { addDoc, collection } from "firebase/firestore";

import { db } from "../firebase/config";

export const createProduct = async (productData) => {
  if (!productData || typeof productData !== "object") {
    console.error("Error: Datos inválidos", productData);
    return;
  }

  const docRef = await addDoc(collection(db, "productos"), productData);

  console.log("Datos guardados en Firestore:", productData);
  console.log("Document written with ID: ", docRef.id);

  return docRef;
};