import {
  Badge,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { user, isAdmin, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <SimpleGrid p={4} bg="gray.200">
      <Flex align="center" justify="center" mb={2}>
        <Image src="/logo.png" alt="Logo" boxSize="50px" mr={3} />
        <Heading size="lg">Productos para gatos</Heading>
      </Flex>

      <HStack spacing={4} justify="center">
        <Link as={RouterLink} to="/">Home</Link>
        <Link as={RouterLink} to="/products">Productos</Link>

        {user && (
          <IconButton
            icon={
              <Flex position="relative">
                <FaShoppingCart size={20} />
                {cart.length > 0 && (
                  <Badge
                    colorScheme="red"
                    borderRadius="full"
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    fontSize="0.8em"
                  >
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </Badge>
                )}
              </Flex>
            }
            aria-label="Carrito"
            onClick={() => navigate("/cart")}
            variant="ghost"
            color="black"
            _hover={{ bg: "gray.300" }}
          />
        )}

        {!user ? (
          <>
            <Link as={RouterLink} to="register">
              Regístrate
            </Link>
            <Link as={RouterLink} to="login">
              Iniciar sesión
            </Link>
          </>
        ) : (
          <>
            {isAdmin && (
              <Link as={RouterLink} to="create">
                Crear producto
              </Link>
            )}
            <Button colorScheme="red" onClick={logout}>
              Cerrar sesión
            </Button>
          </>
        )}
      </HStack>
    </SimpleGrid>
  );
};

export default Header;