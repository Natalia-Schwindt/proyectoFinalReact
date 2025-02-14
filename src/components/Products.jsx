import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { Box, Button, Image, SimpleGrid, Text, Flex, Heading, Center, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const q = query(collection(db, "productos"), orderBy("name", "asc"));
        const querySnapshot = await getDocs(q);
        const productosLista = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setProductos(productosLista);
      } catch (error) {
        console.error("Error obteniendo productos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, []);

  if (loading) return <Center mt={8}><Spinner size="xl" /></Center>;

  return (
    <Flex direction="column" align="center" p={16}>
      <Heading size="lg" mb={6} textAlign="center">Productos</Heading>
      
      {productos.length === 0 ? (
        <Text textAlign="center">No hay productos disponibles.</Text>
      ) : (
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
      )}
    </Flex>
  );
};

export default Products;
