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
  const [isAdmin, setIsAdmin] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(currentUser?.email === "naty10@gmail.com");
    });

    return () => unsubscribe();
  }, []);

  const registerUser = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);

      toast({
        title: "Registro exitoso",
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

  const login = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsAdmin(userCredential.user.email === "naty10@gmail.com");

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

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
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
    <AuthContext.Provider value={{ user, isAdmin, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);