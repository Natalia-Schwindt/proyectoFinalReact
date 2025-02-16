import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase/config";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const q = query(collection(db, "productos"), orderBy("name", "asc"));
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductList(productsList);
      } catch (error) {
        console.error("Error obteniendo productos:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = productList.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "low" && product.price < 50) ||
      (priceRange === "mid" && product.price >= 50 && product.price <= 100) ||
      (priceRange === "high" && product.price > 100);
    const matchesFavorite = !showFavorites || product.is_favorite;

    return matchesName && matchesPrice && matchesFavorite;
  });

  if (loading)
    return (
      <Center mt={8}>
        <Spinner size="xl" />
      </Center>
    );

  return (
    <Flex direction="column" align="center" p={16}>
      <Heading size="lg" mb={6} textAlign="center">
        Productos
      </Heading>

      <Flex
        direction={{ base: "column", md: "row" }}
        gap={4}
        mb={6}
        w="100%"
        maxW="500px"
        justify="center"
        align="center"
      >
        <Input
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="all">Todos los precios</option>
          <option value="low">Menos de $50</option>
          <option value="mid">$50 - $100</option>
          <option value="high">Más de $100</option>
        </Select>

        <Checkbox
          isChecked={showFavorites}
          onChange={(e) => setShowFavorites(e.target.checked)}
        >
          Favoritos
        </Checkbox>
      </Flex>

      {filteredProducts.length === 0 ? (
        <Text textAlign="center">
          No hay productos que coincidan con los filtros.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} maxW="900px">
          {filteredProducts.map((product) => (
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
      )}
    </Flex>
  );
};

export default Products;
