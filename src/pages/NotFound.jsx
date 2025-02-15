import { Button, Flex, Heading, Image,Text } from "@chakra-ui/react";
import React from 'react'
import { useNavigate } from "react-router-dom";

import gato404 from "../assets/gato404.png";

const NotFound = () => {
    const navigate = useNavigate();

  return (
    <Flex direction="column" align="center" justify="center" maxHeight="100vh" p={4} mt={8}>
      <Heading size="xl" color="teal.500">¡Oops! Página no encontrada.</Heading>
      <Text mt={4} fontSize="lg" color="gray.600">
      Parece que un gato travieso se comió esta página.
      </Text>
      <Image src={gato404} alt="Gato 404" maxW="300px" mt={6} borderRadius="md"/>
      <Button colorScheme="teal" mt={6} onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </Flex>
  );
};

export default NotFound