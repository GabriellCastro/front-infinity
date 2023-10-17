import { ComponentStyleConfig } from "@chakra-ui/react";

export const Link: ComponentStyleConfig = {
  defaultProps: { variant: "primary" },
  variants: {
    primary: {
      transition: "color 0.1s",
      position: "relative",
      _after: {
        content: '""',
        position: "absolute",
        bgColor: "brand.green.500",
        height: "1px",
        width: "0px",
        right: 0,
        bottom: "-2px",
        transition: "0.2s ease",
      },
      _hover: {
        textDecoration: "none",
        _after: {
          left: 0,
          width: "100%",
          opacity: 1,
        },
      },
    },
  },
};
