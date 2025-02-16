import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase/config";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const favoriteProducts = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((product) => product.is_favorite === true);

        setProductList(favoriteProducts);
      } catch (error) {
        console.error("Error obteniendo productos:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <Flex justify="center" p={16}>
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} maxW="900px">
        {productList.map((product) => (
          <Box
            key={product.id}
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
              src={product.image_url}
              alt={product.name}
              boxSize="200px"
              objectFit="cover"
              mx="auto"
            />
            <Text fontWeight="bold" fontSize="m" mt={2}>
              {product.name}
            </Text>
            <Text fontSize="s" color="gray.600">
              ${product.price}
            </Text>
            <Button
              colorScheme="teal"
              size="sm"
              mt={2}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              Ver más
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Home;
