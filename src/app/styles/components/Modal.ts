export const Modal = {
  variants: {
    primary: {
      dialog: {
        bg: "brand.backgroundTertiary",
        color: "white",
      },
      header: {
        textAlign: "center",
      },
      closeButton: {
        left: 4,
        top: "50%",
        transform: "translateY(-50%)",
      },
    },
  },
  defaultProps: { variant: "primary" },
};
