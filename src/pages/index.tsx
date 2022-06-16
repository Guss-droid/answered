import Head from "next/head";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";

import { Aside } from "../components/Aside";
import { Input } from "../components/Inputs";
import { Button } from "../components/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>Login - Answered</title>
      </Head>

      <Flex w="100%" h="100vh">
        <Aside />

        <Flex align="center" justify="center" w="65%">
          <Box
            borderWidth={1}
            borderColor="gray.1000"
            borderRadius="12"
            p="6"
            w="30%"
          >
            <Input
              name="Email"
              label="E-mail :"
              mb="8"
            />

            <Input
              name="password"
              label="Senha :"
            />
            <Text fontSize="14">Esqueci minha senha.</Text>

            <Button 
              text="Entrar"
              bg="blue.500"
              color="gray.0"
              my="4"
              w="100%"
            />

            <Divider />

            <Flex fontSize="18" mt="4" justify="center">
              <Text>Não tem conta?</Text>

              <Text color="blue.500" fontWeight={500} ml="1">
                Cadastra-se.
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}
