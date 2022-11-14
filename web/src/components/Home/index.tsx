import { useEffect, useState } from "react";
import { Button, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { Input } from "../Input";
import { apiQuestions } from "../../services/api";
import { Question } from "../Question";

interface ICategory {
  id: string;
  category: string;
}

interface ILikes {
  questionId: string;
  customerEmail: string;
}

interface IQuestion {
  id: string;
  question: string;
  countLike: number;
  customerEmail: string;
  categories: {
    id: string;
    category: string;
  }
  createdAt: string;
  likedBy: ILikes[];
}

export function HomeComp() {

  const [categories, setCategories] = useState<ICategory[]>([])
  const [questions, setQuestions] = useState<IQuestion[]>([])

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await apiQuestions.get("categories")

      setCategories(data)
    }

    async function fetchQuestions() {
      const { data } = await apiQuestions.get("questions")

      setQuestions(data)
    }

    fetchCategories()
    fetchQuestions()
  }, [])

  return (
    <Flex px={7} flexDir="column" w="100%" h="80vh" align="center" mt={8}>
      <Flex gap={12}>
        <Button
          w="400px"
          h={16}
          bg="indigo.700"
          color="gray.0"
          fontSize={18}
          transition="0.4s"
          _hover={{ opacity: 0.7 }}
        >
          Perguntar
        </Button>

        <Button
          w="400px"
          h={16}
          bg="indigo.200"
          fontSize={18}
          transition="0.4s"
          _hover={{ opacity: 0.7 }}
        >
          Ver perguntas curtidas
        </Button>

        <Button
          w="400px"
          h={16}
          bg="indigo.200"
          fontSize={18}
          transition="0.4s"
          _hover={{ opacity: 0.7 }}
        >
          Ver perguntas salvas
        </Button>
      </Flex>

      <Stack direction="row" spacing={10} w="80%" mt={12}>
        <Input
          name="search"
          placeholder="Pesquisar pergunta..."
          bg="transparent"
          h={12}
          _placeholder={{ color: "gray.150" }}
        />

        <Button
          py={6}
          px={16}
          bg="indigo.700"
          color="gray.0"
          transition="0.4s"
          _hover={{ opacity: 0.6 }}
        >
          Pesquisar
        </Button>
      </Stack>

      <Flex flexDir="column" w="100%" align="flex-start" mt={10}>
        <Text>Categoria: </Text>
        <Grid templateColumns="repeat(6, 2fr)" gap={8} mt={3}>
          {categories?.map(item => (
            <GridItem key={item.id}>
              <Button
                w="205px"
                h={9}
                bg="indigo.500"
                color="gray.0"
                transition="0.4s"
                _hover={{ opacity: 0.6 }}
              >
                {item.category}
              </Button>
            </GridItem>
          ))}
        </Grid>
      </Flex>
      
      <Flex flexDir="column" w="100%" align="flex-start" mt={10}>
        <Text>Perguntas mais recentes: </Text>

        {questions.map(item => (
          <Question
            key={item.id}
            category={item.categories.category}
            countLike={item.countLike}
            email={item.customerEmail}
            createdAt={item.createdAt}
            question={item.question}
            id={item.id}
            likedBy={item.likedBy}
          />
        ))}
      </Flex>
    </Flex>
  )
}