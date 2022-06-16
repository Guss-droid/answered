import { ButtonProps, Button as ButtonUi } from "@chakra-ui/react";

interface IButton extends ButtonProps {
  text?: string;
}

export function Button({ text, ...rest }: IButton) {
  return (
    <ButtonUi
      _hover={{
        opacity: 0.8,
        bg: "blue.400"
      }}
      _focus={{
        outline: "none"
      }}
      size="lg"
      {...rest}
    >
      {!text ? "" : text}
    </ButtonUi>
  )
}