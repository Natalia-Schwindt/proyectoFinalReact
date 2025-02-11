import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { Box, Button, Image, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Headers from "../components/Header";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const productosFavoritos = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((producto) => producto.is_favorite === true);

        setProductos(productosFavoritos);
      } catch (error) {
        console.error("Error obteniendo productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <>
      <Headers />
      <Flex justify="center" p={5}>
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} maxW="900px">
        {productos.map((producto) => (
          <Box
            key={producto.id}
            borderWidth="1px"
            borderRadius="lg"
            p={2}
            textAlign="center"
            boxShadow="sm"
            transition="all 0.3s"
            _hover={{ transform: "scale(1.05)", boxShadow: "md" }}
             maxW="220px"
             mx="auto"
          >
            <Image
              src={producto.image_url}
              alt={producto.name}
              boxSize="200px"
              objectFit="cover"
              mx="auto"
            />
            <Text fontWeight="bold" fontSize="m" mt={2}>
              {producto.name}
            </Text>
            <Text fontSize="s" color="gray.600">
              ${producto.price}
            </Text>
            <Button
              colorScheme="teal"
              size="sm"
              mt={2}
              onClick={() => navigate(`/producto/${producto.id}`)}
            >
              Ver más
            </Button>
          </Box>
        ))}
      </SimpleGrid>
      </Flex>
    </>
  );
};

export default Home;
