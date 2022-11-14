import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import {
  FormLabel,
  InputGroup,
  InputProps,
  IconButton,
  FormControl,
  useColorMode,
  FormErrorIcon,
  Input as InputUi,
  FormErrorMessage,
  InputRightElement,
} from "@chakra-ui/react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

interface IInput extends InputProps {
  name: string;
  label?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  readOnly?: boolean;
  labelColor?: string;
  isInputPassword?: boolean;
  type?: string;
  iconColor?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
  {
    name,
    label,
    error = null,
    readOnly = false,
    labelColor,
    isInputPassword = false,
    type = "text",
    iconColor = "gray.400",
    ...rest
  }, ref) => {

  const [showPass, setShowPass] = useState(false)
  const { colorMode } = useColorMode()

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel
        htmlFor={name}
        color={labelColor ? labelColor : (colorMode === "light" ? "gray.700" : "gray.200")}
      >
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
          h={10}
          autoComplete="new-password"
          bg={colorMode === "light" ? "gray.700" : "gray.500"}
          focusBorderColor="orange.500"
          _focusVisible={{
            boxShadow: "dark-lg",
            bg: colorMode === "light" ? "" : "gray.150",
            color: colorMode === "light" ? "gray.400" : "gray.900"
          }}
          type={isInputPassword ? (showPass ? "text" : "password") : type}
          _hover={{
            opacity: 0.6
          }}
          {...rest}
        />
        {isInputPassword && (
          <InputRightElement h="100%" w="20%">
            <IconButton
              as={showPass ? RiEyeLine : RiEyeCloseLine}
              aria-label="Icon input"
              onClick={() => setShowPass(!showPass)}
              variant="ghost"
              w={5}
              h={5}
              color={iconColor}
            />
          </InputRightElement>
        )}
      </InputGroup>

      {!!error &&
        <FormErrorMessage>
          <>
            <FormErrorIcon />
            {error.message}
          </>
        </FormErrorMessage>
      }
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)