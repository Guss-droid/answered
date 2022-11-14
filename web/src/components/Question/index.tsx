import { useEffect, useState } from "react";
import { Box, Button, Divider, Flex, Icon, IconButton, Text } from "@chakra-ui/react";

import { AiFillHeart, AiFillStar, AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { apiAuth, apiQuestions } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

interface IQuestion {
  email: string;
  category: string;
  createdAt: string;
  question: string;
  countLike: number;
  id: string;
  likedBy: ILikes[]
}

interface ILikes {
  customerEmail: string;
  questionId: string;
}

export function Question({
  email,
  category,
  createdAt,
  question,
  countLike,
  id,
  likedBy
}: IQuestion) {

  const { user } = useAuth()
  const [name, setName] = useState("")
  const [likes, setLikes] = useState(countLike)
  const [liked, setLiked] = useState(() => {
    const questionLike = likedBy.filter(i => i.questionId === id && i.customerEmail === user.email)

    console.log(questionLike)
    if (questionLike.length >= 1) {
      return true
    }

    return false
  })
  const [saved, setSaved] = useState(false)


  useEffect(() => {
    async function fetchUser() {
      const { data } = await apiAuth.post("/user/email", { email })

      setName(data.name)
    }

    fetchUser()
  }, [email])


  async function giveLike() {
    const { data } = await apiQuestions.post("/likes/question", { id })

    setLiked(!liked)
    setLikes(data.countLike)
  }

  async function saveQuestion() {
    await apiQuestions.post(`/save/${id}`)

    setSaved(!saved)
  }

  return (
    <Flex flexDir="column" w="100%">
      <Box
        as="header"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
      >
        <Flex gap={2} align="center">
          <Text fontSize={18}>{name}</Text>
          •
          <Text fontSize={14} color="gray.200">{category}</Text>
        </Flex>

        <Text fontSize={14} color="gray.400">{createdAt}</Text>
      </Box>

      <Box
        as="main"
        display="flex"
        alignItems="center"
        w="100%"
        justifyContent="center"
        my={4}
      >
        <Text fontSize={24} maxW={1116}>
          {question}
        </Text>
      </Box>

      <Box as="footer" ml="auto" display="flex" alignItems="center" gap={3}>
        <Button
          aria-label="like"
          variant="ghost"
          cursor="pointer"
          fontSize={20}
          onClick={() => giveLike()}
          transition="0.4s"
          _hover={{ opacity: 0.5 }}
        >
          {likes}
          <Icon as={liked ? AiFillHeart : AiOutlineHeart} w={8} h={8} color={liked ? "red.500" : "gray.1000"} />
        </Button>

        <IconButton
          aria-label="save"
          color={saved ? "yellow.400" : "gray.1000"}
          as={saved ? AiFillStar : AiOutlineStar}
          h={8}
          variant="ghost"
          cursor="pointer"
          onClick={() => saveQuestion()}
          transition="0.4s"
          _hover={{ opacity: 0.5 }}
        />

        <Button
          bg="indigo.700"
          color="gray.0"
          px={8}
          transition="0.4s"
          _hover={{ opacity: 0.7 }}
        >
          Ir para a pergunta
        </Button>
      </Box>

      <Divider mt={4} />
    </Flex>
  )
}