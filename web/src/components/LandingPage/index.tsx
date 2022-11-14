import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Divider, Flex, Icon, Image, Input, Stack, Text } from "@chakra-ui/react";

import { AiFillLinkedin, AiFillGithub, AiFillInstagram } from "react-icons/ai";

export function LandingPage() {

  const router = useRouter()

  return (
    <Flex w="100%" mt={4} flexDir="column" align="center">
      <Box
        maxW={["600px", "650px", "750px", "850px", "1250px", "1342px"]}
        w="100%"
        h="593px"
        bgImage="./banner.svg"
        bgRepeat="no-repeat"
        bgPosition="center"
        display="flex"
        justifyContent="center"
        borderRadius={16}
        px={16}
        flexDir="column"
        gap={6}
      >
        <Text fontSize={48} fontWeight={600} color="gray.0">
          Tire sua duvida conosco
        </Text>

        <Text color="gray.0" maxW="333px" fontSize={24} fontWeight={500}>
          Perguntas de qualquer tipo, sem anúncios e totalmente grátis, somente aqui.
        </Text>

        <Button
          w="284px"
          h={12}
          bg="indigo.700"
          color="gray.0"
          opacity={0.80}
          onClick={() => router.push("/login")}
          _hover={{ opacity: 1 }}
        >
          Comece agora
        </Button>
      </Box>

      <Box
        bg="indigo.600"
        mt={24}
        h="600px"
        w="100%"
        display="flex"
        flexDir="column"
        color="gray.0"
        px={12}
        py={8}
        gap={12}
        id="about"
      >
        <Flex justify="space-between">
          <Flex flexDir="column" gap={3}>
            <Text fontSize={48} fontWeight={600}>Apoio total ao usuário</Text>
            <Text fontSize={20} fontWeight={500} maxW="618px">
              Aqui na answered temos o apoio total ao usuario, ajudando e auxiliando da melhor maneira possível.
            </Text>
          </Flex>

          <Image src="./userTurn.svg" alt="user" />
        </Flex>

        <Flex justify="space-between">
          <Image src="./watch.svg" alt="relógio" />

          <Flex flexDir="column" gap={3}>
            <Text fontSize={48} fontWeight={600}>Fácil e rápido</Text>
            <Text fontSize={20} fontWeight={500} maxW="618px">
              Faça perguntas de um modo mais fácil e rápido que qualquer outro site.
            </Text>
          </Flex>
        </Flex>

        <Flex justify="space-between">
          <Flex flexDir="column" gap={3}>
            <Text fontSize={48} fontWeight={600}>Totalmente gratuito</Text>
            <Text fontSize={20} fontWeight={500} maxW="618px">
              Aqui não cobramos nada pelas perguntas e não exibimos nenhum tipo de anúncio.
            </Text>
          </Flex>

          <Image src="./noAdd.svg" alt="image" />
        </Flex>
      </Box>

      <Flex
        mt={12}
        flexDir="column"
        align="flex-start"
        w="100%"
        px={12}
        gap={5}
        id="example"
      >
        <Text fontSize={32} fontWeight={600}>Veja como é fácil: </Text>

        <Stack direction="row" spacing={16} w="100%">
          <Input
            placeholder="Faça uma pergunta..."
            pl={7}
            border={0}
            h={12}
            bg="indigo.200"
            opacity={0.6}
            color="gray.1000"
            _hover={{ opacity: 1 }}
          />

          <Button
            h={12}
            w="202px"
            bg="indigo.700"
            color="gray.0"
            cursor="pointer"
            onClick={() => router.push("/login")}
            _hover={{ opacity: 0.6 }}
          >
            Enviar
          </Button>
        </Stack>
      </Flex>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        px={12}
        mt={16}
      >
        <Flex flexDir="column">
          <Text fontSize={40} fontWeight={600}>
            Pronto para começar?
          </Text>

          <Text fontSize={32} fontWeight={600} color="#0D469B">
            Faça o login ou crie uma conta...
          </Text>
        </Flex>

        <Stack direction="row" spacing={4}>
          <Button
            w="158px"
            h={12}
            borderRadius={8}
            bg="indigo.800"
            color="gray.0"
            transition="0.4s"
            onClick={() => router.push("/createAccount")}
            _hover={{ opacity: 0.8 }}
          >
            Criar conta
          </Button>

          <Button
            w="158px"
            h={12}
            borderRadius={8}
            bg="transparent"
            borderWidth={2}
            borderColor="indigo.800"
            transition="0.4s"
            onClick={() => router.push("/login")}
            _hover={{ opacity: 0.5 }}
          >
            Login
          </Button>
        </Stack>
      </Box>

      <Flex w="100%" alignItems="center" justifyContent="center" mt={16} id="contact">
        <Box
          display="flex"
          bg="indigo.600"
          alignItems="center"
          borderRadius={12}
          h="492px"
          p={10}
          gap={16}
        >
          <Image src="./personContact.svg" alt="contato" />

          <Flex
            as="form"
            flexDir="column"
            gap={4}
            color="gray.0"
            justify=""
          >
            <Text>Entre em contato:</Text>

            <Input
              w="606px"
              bg="#F5F5F5"
              borderRadius={8}
              pl={5}
              placeholder="Email..."
              opacity={0.8}
              color="#121214"
            />
            <Input
              w="606px"
              bg="#F5F5F5"
              borderRadius={8}
              pl={5}
              placeholder="Nome..."
              opacity={0.8}
              color="#121214"
            />

            <textarea
              style={{
                opacity: 0.8,
                color: "#121214",
                background: "#F5F5F5",
                paddingLeft: "20px",
                borderRadius: 8,
                height: "118px",
                paddingTop: 8
              }}
              placeholder="Feedback..."
            />

            <Button
              mt={12}
              ml="auto"
              bg="indigo.800"
              px={6}
              transition="0.4s"
              _hover={{ opacity: 0.7 }}
            >
              Enviar
            </Button>
          </Flex>
        </Box>
      </Flex>

      <Divider mt={16} w="98%" mx={5} mb={8} />
      <Flex w="100%" px={12} align="center" justify="space-between" pb={6}>
        <Text color="#00000072">
          © 2022 Answered. Todos os direitos reservados
        </Text>

        <Stack direction="row" spacing={5}>
          <Link href="https://linkedin.com/in/gustavo-re" passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Icon
                as={AiFillLinkedin}
                w={7}
                h={7}
                cursor="pointer"
              />
            </a>
          </Link>

          <Link href="https://github.com/Guss-droid" passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Icon
                as={AiFillGithub}
                w={7}
                h={7}
                cursor="pointer"
              />
            </a>
          </Link>

          <Link href="https://instagram.com/guh_re" passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Icon
                as={AiFillInstagram}
                w={7}
                h={7}
                cursor="pointer"
              />
            </a>
          </Link>
        </Stack>
      </Flex>
    </Flex>
  )
}