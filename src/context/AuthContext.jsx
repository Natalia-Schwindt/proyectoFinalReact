import { useToast } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      toast({
        title: "Inicio de sesión exitoso",
        status: "success",
        isClosable: true,
        duration: 3000,
      });

      navigate("/");
    } catch (error) {
      console.log(error.code, error.message);
      toast({
        title: "Error al iniciar sesión",
        description: error.message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  const registerUser = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      toast({
        title: "Usuario registrado",
        status: "success",
        isClosable: true,
        duration: 3000,
      });

      navigate("/");
    } catch (error) {
      console.log(error.code, error.message);
      toast({
        title: "Error al registrarse",
        description: error.message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast({
        title: "Sesión cerrada correctamente",
        status: "info",
        isClosable: true,
        duration: 3000,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
