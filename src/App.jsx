import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react'
import React from 'react'

import { auth } from './firebase/config'

function App() {
  const login = () => {
  signInWithEmailAndPassword(auth, 'naty@gmail.com', '123123')
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    }
    login()
  return (
    <>
     <h1>Hola</h1>
    </>
  )
}

export default App
