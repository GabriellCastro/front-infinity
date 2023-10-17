import { cssVar } from "@chakra-ui/react";

const $arrowBg = cssVar("popper-arrow-bg");

export const Tooltip = {
  variants: {
    primary: {
      bg: "#141414",
      p: 4,
      fontSize: "small",
      color: "white",
      borderRadius: "5px",
      [$arrowBg.variable]: "#141414",
    },
  },
  defaultProps: { variant: "primary" },
};
