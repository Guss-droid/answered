import { useRouter } from "next/router";
import { Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react";

import * as yup from "yup";
import { Input } from "../Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginUser, useAuth } from "../../context/AuthContext";

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("Formato inválido"),
  password: yup.string().required("Senha obrigatória").min(6, "No mínimo 6 caracteres"),
})

export function LoginComp() {

  const router = useRouter()
  const { signIn } = useAuth()
  const { formState, handleSubmit, register } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors, isSubmitting } = formState

  const onSubmit: SubmitHandler<ILoginUser> = async (data) => {
    try {
      await signIn(data)
    } catch (error) {
      
    }
  }

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
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          name="email"
          label="E-mail:"
          bg="gray.100"
          error={errors.email}
          {...register("email")}
        />

        <Input
          name="password"
          label="Senha:"
          bg="gray.100"
          isInputPassword
          error={errors.password}
          {...register("password")}
        />

        <Button
          bg="indigo.700"
          color="gray.0"
          type="submit"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          _hover={{ opacity: 0.6 }}
        >
          Entrar
        </Button>

        <Divider w="100%" />
        <Flex w="100%" justify="center" mt={-2} fontSize={14}>
          <Text>Não tem uma conta?</Text>
          <Text
            ml={1}
            color="indigo.800"
            fontWeight={600}
            cursor="pointer"
            onClick={() => router.push("/createAccount")}
          >
            Cadastra-se.
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}