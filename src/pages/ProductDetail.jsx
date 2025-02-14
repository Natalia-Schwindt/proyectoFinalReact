import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image, Text, Button, Flex } from "@chakra-ui/react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProducto(docSnap.data());
        } else {
          console.log("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error obteniendo producto:", error);
      }
    };

    obtenerProducto();
  }, [id]);

  if (!producto) {
    return <Text>Cargando...</Text>;
  }

  return (
    <Flex direction="column" align="center" p={8}>
      <Image
        src={producto.image_url}
        alt={producto.name}
        boxSize="300px"
        objectFit="cover"
      />
      <Text fontWeight="bold" fontSize="xl" mt={4}>
        {producto.name}
      </Text>
      <Text fontSize="lg" color="gray.600">
        ${producto.price}
      </Text>
      <Text mt={4}>{producto.description}</Text>
      <Flex mt={6} gap={4}>
        <Button colorScheme="teal" mt={6} onClick={() => navigate(-1)}>
          Volver
        </Button>
        <Button colorScheme="teal" mt={6}>
          Agregar al carrito
        </Button>
      </Flex>
    </Flex>
  );
};

export default ProductDetail;
