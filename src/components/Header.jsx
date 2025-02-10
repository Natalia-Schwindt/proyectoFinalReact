import { Button, Heading, HStack, Link, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
// import React from 'react'
import { Link as RouterLink,NavLink } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

const Header = () => {
    const { user, logout } = useAuth()

  return (
    <SimpleGrid p={4} bg="gray.100">
        <Heading size="lg" textAlign="center">
          Productos para gatos
          </Heading>

      <HStack spacing={4} justify="center">
        <Link as={RouterLink} to="/">
        Home
        </Link>

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
            <Link as={RouterLink} to="create">
              Crear producto
            </Link>
            <Button colorScheme="red" onClick={logout}>
              Cerrar sesión
            </Button>
          </>
        )}
      </HStack>
    </SimpleGrid>
  );
};

export default Header
