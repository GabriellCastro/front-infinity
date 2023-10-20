import { StyleFunctionProps, StyleProps } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const Button = {
  variants: {
    outline: (props: StyleFunctionProps) => {
      const { colorScheme: c } = props;
      const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props);
      return {
        border: "1px solid",
        fontWeight: 700,
        color: !!c ? `${c}.500` : "currentColor",
        _hover: {
          color: !!c ? `${c}.600` : "currentColor",
          borderColor: "currentColor",
        },
        borderColor: c === "gray" ? borderColor : "currentColor",
        ".chakra-button__group[data-attached][data-orientation=horizontal] > &:not(:last-of-type)":
          { marginEnd: "-1px" },
        ".chakra-button__group[data-attached][data-orientation=vertical] > &:not(:last-of-type)":
          { marginBottom: "-1px" },
        h: "50px",
      };
    },
    primary: {
      fontSize: "sm",
      fontWeight: "bold",
      bg: "brand.primary.500",
      _hover: {
        bg: "brand.primary.600",
        _disabled: {
          bg: "brand.primary.600",
        },
      },
      borderRadius: "5px",
      px: 5,
      h: "50px",
      color: "brand.backgroundSecondary",
    },
    secondary: {
      w: "100%",
      fontSize: "md",
      fontWeight: "bold",
      bg: "brand.primary.500",
      _hover: { bg: "brand.primary.600" },
      borderRadius: "5px",
      px: 5,
      h: "60px",
    },
    dark: {
      w: "100%",
      fontSize: "md",
      fontWeight: "bold",
      bg: "brand.text.500",
      _hover: { bg: "#000000" },
      borderRadius: "5px",
      px: 4,
      h: "60px",
      color: "brand.backgroundSecondary",
    },
    darkOutline: {
      w: "100%",
      fontSize: "md",
      fontWeight: "bold",
      borderRadius: "5px",
      px: 4,
      h: "60px",
      color: "brand.text.500",
      border: "1px solid",
      borderColor: "brand.text.500",
      _hover: {
        borderColor: "brand.text.300",
        color: "brand.text.300",
      },
    },
    light: {
      fontSize: "md",
      fontWeight: "bold",
      bg: "brand.backgroundSecondary",
      _hover: { bg: "brand.backgroundTertiary" },
      borderRadius: "5px",
      px: 4,
      h: "50px",
      border: "1px solid",
      borderColor: "brand.text.500",
    },
    solid: {
      h: "50px",
    },
    withoutBackground: {
      bg: "none",
    },
  },
  defaultProps: { variant: "primary" },
};
