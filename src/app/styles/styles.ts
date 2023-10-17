export const styles = {
  global: {
    body: {
      background: "brand.background",
      scrollBehavior: "smooth",
      color: "brand.text.500",
      fontWeight: 500,
    },
    "*::-webkit-scrollbar": { width: "5px" },
    "*::-webkit-scrollbar-thumb": {
      bg: "brand.primary.600",
      borderRadius: "full",
    },
    "*::-webkit-scrollbar-track": {
      backgroundColor: "brand.backgroundPrimary",
    },

    ".swiper": {
      width: "100%",
      zIndex: 1,
    },

    ".card-swiper": {
      ".swiper-wrapper": {
        display: "flex",
      },
      ".swiper-button-next, .swiper-button-prev": {
        bg: "brand.primary.500",
        w: "44px",
        h: "44px",
        borderRadius: "full",
        boxShadow:
          "0px 4px 24px rgba(0, 0, 0, 0.08), 0px 4px 242px rgba(0, 0, 0, 0.22), 0px 4px 89px rgba(0, 0, 0, 0.25);",
        p: 4,
        mt: "0",
        transform: "translateY(-50%)",
      },
      ".swiper-button-next": {
        backgroundImage: `url(/arrow-right.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "50% auto",
        backgroundPosition: "center",
      },
      ".swiper-button-prev": {
        backgroundImage: `url(/arrow-left.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "50% auto",
        backgroundPosition: "center",
      },
      ".swiper-button-next::after, .swiper-button-prev::after": {
        display: "none",
      },
      ".swiper-button-disabled": {
        opacity: 0,
        display: "none",
      },
    },
  },
};
