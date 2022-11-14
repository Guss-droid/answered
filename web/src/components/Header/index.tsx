import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Flex, IconButton, Image, Stack, Text } from "@chakra-ui/react";

import { useAuth } from "../../context/AuthContext";
import { AiOutlineMore } from "react-icons/ai"

export function HeaderLandingPage() {

  const router = useRouter()

  return (
    <Flex
      w="100%"
      align="center"
      px={6}
      py={2}
    >
      <Image src="./logo.svg" alt="logo" cursor="pointer" />

      <Stack direction="row" spacing={9} w="100%" display="flex" align="center" justify="center">
        <Link href="#about">
          Sobre nós
        </Link>

        <Link href="#example">
          Exemplo
        </Link>

        <Link href="#contact">
          Contato
        </Link>
      </Stack>

      <Flex ml="auto">
        <Button
          borderRadius="32px 0 0 32px"
          color="gray.0"
          bg="indigo.700"
          w="137px"
          h={12}
          transition="0.4s"
          onClick={() => router.push("/createAccount")}
          _hover={{ opacity: 0.5 }}
        >
          Criar conta
        </Button>

        <Button
          borderRadius="0 32px 32px 0"
          w="137px"
          h={12}
          bg="transparent"
          borderWidth={2}
          borderColor="indigo.700"
          transition="0.4s"
          onClick={() => router.push("/login")}
          _hover={{ opacity: 0.5 }}
        >
          Login
        </Button>
      </Flex>
    </Flex>
  )
}

export function Header() {

  const { user } = useAuth()

  return (
    <Flex
      w="100%"
      h={24}
      bg="indigo.600"
      px={7}
      py={4}
      color="gray.0"
      align="center"
      justify="space-between"
    >
      <Box>
        <Image />

        <Flex flexDir="column">
          <Text fontSize={20}>{user?.name}</Text>
          <Text fontSize={12} color="gray.150">{user?.email}</Text>
        </Flex>
      </Box>

      <Text fontSize={32}>Answered</Text>

      <IconButton
        as={AiOutlineMore}
        aria-label="opções"
        variant="ghost"
        w={12}
        h={12}
        cursor="pointer"
        _hover={{ opacity: 0.5 }}
      />
    </Flex>
  )
}