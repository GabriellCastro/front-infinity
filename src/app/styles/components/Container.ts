import { ComponentStyleConfig } from "@chakra-ui/react";

export const Container: ComponentStyleConfig = {
  variants: {
    primary: {
      display: "flex",
      flexDir: "column",
      maxW: "1360px",
    },
  },
  defaultProps: { variant: "primary" },
};
