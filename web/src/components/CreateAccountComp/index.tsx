import { useRouter } from "next/router";
import { Box, Button, Flex, Image, Select } from "@chakra-ui/react";
import { Input } from "../Input";

export function CreateAccountComp() {

  const router = useRouter()

  return (
    <Flex w="100%" h="100vh" align="center" >
      <Image src="./bannerLogin.svg" alt="mountains" h="100vh" />

      <Box
        as="form"
        borderWidth={1}
        borderColor="indigo.700"
        p={12}
        borderRadius={8}
        display="flex"
        flexDir="column"
        gap={5}
        mx="auto"
      >
        <Input
          name="name"
          label="Nome:"
          bg="gray.100"
        />

        <Input
          name="email"
          label="E-mail:"
          bg="gray.100"
        />

        <Input
          name="password"
          label="Senha:"
          bg="gray.100"
          isInputPassword
        />

        <Flex flexDir="column" gap={4}>
          <Button
            bg="indigo.700"
            color="gray.0"
            _hover={{ opacity: 0.6 }}
          >
            SALVAR
          </Button>

          <Button
            bg="transparent"
            color="red.500"
            borderWidth={1}
            borderColor="red.500"
            onClick={() => router.push("/login")}
            _hover={{ opacity: 0.6 }}
          >
            VOLTAR
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}