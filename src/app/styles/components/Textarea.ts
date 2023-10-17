import { ComponentStyleConfig, defineStyle } from "@chakra-ui/react";
import { Input } from "./Input";

export const Textarea: ComponentStyleConfig = {
  variants: {
    secondary: Input.variants?.secondary.field,
  },
};
