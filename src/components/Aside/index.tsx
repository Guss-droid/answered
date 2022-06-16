import { Box, Flex, Image, Text } from "@chakra-ui/react";

export function Aside() {
  return (
    <Flex
      w="35%"
      bgGradient="linear(to-br, #0D4E5C, #478E9D, #97D7E5)"
      align="center"
      as="aside"
      color="gray.0"
    >
      <Box ml="35">
        <Image src="./brand.svg" w="350px" h="350px" />

        <Flex flexDir="column" mt="20">
          <Text fontSize="32" fontWeight="600">
            Tire sua duvida conosco.
          </Text>

          <Text fontSize="20">aprenda e compartilhe conhecimento.</Text>
        </Flex>
      </Box>
    </Flex>
  )
}