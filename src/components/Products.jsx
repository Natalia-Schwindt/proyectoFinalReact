import React, { useEffect, useState } from 'react';
import { SimpleGrid, Box, Heading, Text, Button, Image, Spinner, Center } from '@chakra-ui/react';
import { db } from '../firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "productos"), orderBy("name", "asc"));
        const querySnapshot = await getDocs(q);

        console.log("Cantidad de productos encontrados:", querySnapshot.docs.length);

        const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        console.log("Productos obtenidos:", productsList);
        setProducts(productsList);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Center mt={8}><Spinner size="xl" /></Center>;

  if (products.length === 0) return <Text textAlign="center">No hay productos disponibles.</Text>;

  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Heading size="lg" mb={6} textAlign="center">Productos</Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {products.map((product) => (
          <Box key={product.id} borderWidth={1} borderRadius="lg" p={4} boxShadow="md" bg="white">
            <Image 
              src={product.image_url} 
              alt={product.name} 
              objectFit="cover" 
              w="100%" 
              h="200px" 
              borderRadius="md" 
            />
            <Heading size="md" mt={3} textAlign="center">{product.name}</Heading>
            <Text mt={2} fontSize="sm" color="gray.600">Descripción: {product.description}</Text>
            <Text mt={2} fontSize="lg" fontWeight="bold">Precio: ${product.price}</Text>
            <Button mt={4} colorScheme="teal" w="100%" as="a" href={`/product/${product.id}`}>
              Ver detalles
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Products;
