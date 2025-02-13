import React from "react";
import { Box, Flex, Image, Text, HStack, Link, Icon } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.500" color="white" py={4} mt={8}>
      <Flex justify="center" align="center" mb={2}>
        <Image src="/logo.png" alt="Logo" boxSize="40px" mr={3} />
        <HStack spacing={4}>
          <Link href="https://github.com/Natalia-Schwindt" isExternal>
            <Icon as={FaGithub} boxSize={6} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/natalia-schwindt-3a3438115/"
            isExternal
          >
            <Icon as={FaLinkedin} boxSize={6} />
          </Link>
          <Link href="mailto:naty8014@gmail.com">
            <Icon as={FaEnvelope} boxSize={6} />
          </Link>
        </HStack>
      </Flex>
      <Text textAlign="center" mt={4}>
        Creado por <strong>Natalia Schwindt</strong>
      </Text>
    </Box>
  );
};

export default Footer;
