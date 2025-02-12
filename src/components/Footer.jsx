import React from 'react'
import { Box, Text, HStack, Link, Icon } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.500" color="white" py={4} mt={8}>
      <HStack spacing={4} justify="center">
        <Link href="https://github.com/nataliaschwindt" isExternal>
          <Icon as={FaGithub} boxSize={6} />
        </Link>
        <Link href="https://www.linkedin.com/in/nataliaschwindt/" isExternal>
          <Icon as={FaLinkedin} boxSize={6} />
        </Link>
        <Link href="https://twitter.com/nataliaschwindt" isExternal>
          <Icon as={FaTwitter} boxSize={6} />
        </Link>
      </HStack>
      <Text textAlign="center" mt={4}>
        Creado por <strong>Natalia Schwindt</strong>
      </Text>
    </Box>
  )
}

export default Footer
