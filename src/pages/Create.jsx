import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { createProduct } from "../services/products";

const ADMIN_EMAIL = "naty10@gmail.com";

const Create = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    image_url: "",
    is_favorite: false,
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuth();
  const toast = useToast();

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <Box textAlign="center" mt="8">
        <Text fontSize="xl" color="red.500">
          No tienes permiso para acceder a esta página.
        </Text>
      </Box>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const isValidUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({});

    if (values.image_url && !isValidUrl(values.image_url)) {
      toast({
        title: "URL inválida",
        description: "Por favor ingresa una URL válida para la imagen",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    let errors = {};
    if (!values.name) errors.name = "El nombre es obligatorio";
    if (!values.description) errors.description = "La descripción es obligatoria";
    if (!values.price || isNaN(values.price) || Number(values.price) <= 0) {
      errors.price = "El precio debe ser un número válido";
    }

    if (Object.keys(errors).length > 0) {
        setError(errors);
        return;
      }

    setLoading(true);
    try {
        const productData = { ...values, uid: user?.uid || "SIN_UID" };
      await createProduct({ productData });

      toast({
        title: "Producto creado",
        status: "success",
        isClosable: true,
        duration: 3000,
      });

      setValues({
        name: "",
        description: "",
        image_url: "",
        is_favorite: false,
        price: "",
      });
      setError({});
    } catch (error) {
      toast({
        title: "Error al crear producto",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt="8" p="6" boxShadow="md" borderRadius="md">
      <Heading size="lg" mb="4" textAlign="center">
        Crear Producto
      </Heading>
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <FormControl isInvalid={error.name}>
            <FormLabel>Nombre del producto</FormLabel>
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Ingrese el nombre del producto"
            />
            {error.name && (
              <FormErrorMessage>{error.name}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={error.description}>
            <FormLabel>Descripción</FormLabel>
            <Input
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Ingrese la descripción del producto"
            />
            {error.description && (
    <FormErrorMessage>{error.description}</FormErrorMessage>
  )}
          </FormControl>

          <FormControl>
            <FormLabel>URL de la imagen</FormLabel>
            <Input
              name="image_url"
              value={values.image_url}
              onChange={handleChange}
              placeholder="Ingrese la Url de la imágen"
            />
          </FormControl>

          <FormControl isInvalid={error.price}>
            <FormLabel>Precio</FormLabel>
            <Input
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              placeholder="Ingrese el precio del producto"
            />
            {error.price && (
    <FormErrorMessage>{error.price}</FormErrorMessage>
  )}
          </FormControl>

          <FormControl>
            <Checkbox
              name="is_favorite"
              isChecked={values.is_favorite}
              onChange={handleChange}
            >
              Producto favorito
            </Checkbox>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            isLoading={loading}
            isDisabled={loading}
          >
            {loading ? "Creando..." : "Crear Producto"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Create;
