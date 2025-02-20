import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(currentUser?.email === "naty10@gmail.com");
    });

    return () => unsubscribe();
  }, []);

  const showAlert = (title, description, status) => {
    setAlert({ title, description, status });
    setTimeout(() => setAlert(null), 4000);
  };

  const registerUser = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      showAlert("Registro exitoso", "Tu cuenta ha sido creada con éxito.", "success");
      navigate("/");
    } catch (error) {
      console.log(error.code, error.message);
      showAlert("Error al registrarse", error.message, "error");
    }
  };

  const login = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsAdmin(userCredential.user.email === "naty10@gmail.com");
      showAlert("Inicio de sesión exitoso", "Has iniciado sesión correctamente.", "success");
      navigate("/");
    } catch (error) {
      console.log(error.code, error.message);
      showAlert("Error al iniciar sesión", error.message, "error");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
      showAlert("Sesión cerrada", "Has cerrado sesión correctamente.", "info");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, registerUser }}>
      {alert && (
        <Box position="fixed" top="20px" left="50%" transform="translateX(-50%)" zIndex={1000} width="80%" maxW="400px">
          <Alert status={alert.status} variant="subtle" flexDirection="column" alignItems="center" textAlign="center" borderRadius="md" boxShadow="lg">
            <AlertIcon boxSize="40px" />
            <AlertTitle mt={4} mb={1} fontSize="lg">{alert.title}</AlertTitle>
            <AlertDescription maxWidth="sm">{alert.description}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setAlert(null)} />
          </Alert>
        </Box>
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);