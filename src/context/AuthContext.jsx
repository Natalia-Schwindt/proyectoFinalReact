import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext, useContext, useState } from "react";

import { auth } from "../firebase/config";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = ({ email, password }) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
    };
    

  const registerUser = async ({ email, password }) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user
  }catch(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  }
  }
  return (<AuthContext.Provider value={{ user, registerUser, login }}>{children}</AuthContext.Provider>);
};

export const useAuth = () => useContext(AuthContext);
