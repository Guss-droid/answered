import {
  FormLabel,
  InputGroup,
  InputProps,
  FormControl,
  Input as InputUi,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface IInput extends InputProps {
  name: string;
  label?: string;
  readOnly?: boolean;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
  {
    name,
    label,
    readOnly = false,
    ...rest
  }, ref) => {


  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>
        {label}
      </FormLabel>
      }

      <InputGroup>
        <InputUi
          name={name}
          id={name}
          ref={ref}
          readOnly={readOnly}
          variant="filled"
          borderColor="gray.150"
          borderWidth={1}
          size="lg"
          bg="gray.100"
          focusBorderColor="blue.500"
          _hover={{
            bg: "gray.200"
          }}
          {...rest}
        />
      </InputGroup>

      {/* {!!error && (
        <FormErrorMessage>
          <FormErrorIcon />
          {error.message}
        </FormErrorMessage>
      )} */}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)