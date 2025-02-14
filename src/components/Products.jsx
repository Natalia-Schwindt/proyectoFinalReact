import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  Box,
  Button,
  Image,
  SimpleGrid,
  Text,
  Flex,
  Heading,
  Center,
  Spinner,
  Input,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const q = query(collection(db, "productos"), orderBy("name", "asc"));
        const querySnapshot = await getDocs(q);
        const productosLista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductos(productosLista);
      } catch (error) {
        console.error("Error obteniendo productos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.name.toLowerCase().includes(search.toLowerCase());
    const coincidePrecio = priceRange ==="all" ||
    (priceRange === "low" && producto.price < 50) ||
    (priceRange === "mid" && producto.price >= 50 && producto.price <= 100) ||
    (priceRange === "high" && producto.price > 100);
    const coincideFavorito = !showFavorites || producto.is_favorite;

    return coincideNombre && coincidePrecio && coincideFavorito;
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

      <Flex direction={{ base: "column", md: "row" }} 
        gap={4}
        mb={6}
        w="100%"
        maxW="500px"
        justify="center"
        align="center">

        <Input
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

<Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          <option value="all">Todos los precios</option>
          <option value="low">Menos de $50</option>
          <option value="mid">$50 - $100</option>
          <option value="high">Más de $100</option>
        </Select>

        <Checkbox isChecked={showFavorites} onChange={(e) => setShowFavorites(e.target.checked)}>
         Favoritos
        </Checkbox>
      </Flex>

      {productosFiltrados.length === 0 ? (
        <Text textAlign="center">No hay productos que coincidan con los filtros.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} maxW="900px">
          {productosFiltrados.map((producto) => (
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
