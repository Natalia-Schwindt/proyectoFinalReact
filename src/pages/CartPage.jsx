import { Box, Button, Heading, HStack,Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <Box p={5}>
      <Heading size="xl" mb={4}>🛒 Carrito de Compras</Heading>
      {cart.length === 0 ? (
        <Text fontSize="lg">Tu carrito está vacío.</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {cart.map((item) => (
            <HStack key={item.id} p={4} borderWidth="1px" borderRadius="md">
              <Image src={item.image_url} alt={item.name} boxSize="80px" borderRadius="md" />
              <Box flex="1">
                <Text fontSize="lg" fontWeight="bold">{item.name}</Text>
                <Text>Cantidad: {item.quantity}</Text>
                <Text>Precio: ${item.price * item.quantity}</Text>
              </Box>
              <Button colorScheme="red" onClick={() => removeFromCart(item.id, item.name)}>Eliminar</Button>
            </HStack>
          ))}
          <Button colorScheme="teal" onClick={clearCart}>Vaciar Carrito</Button>
          <Button colorScheme="green" onClick={() => {
            clearCart();
            alert("¡Compra realizada con éxito!");
            navigate("/");
      }}>Finalizar Compra</Button>
        </VStack>
      )}
    </Box>
  );
};

export default CartPage;