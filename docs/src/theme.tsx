import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = {
  mono: `'Menlo', monospace`,
  heading: "Plus Jakarta Sans",
  body: "Plus Jakarta Sans",
};

const theme = extendTheme({
  colors: {
    brand: {
      black: "#16161D",
	  white: "#F2F2F2",
      orange: "rgba(227, 119, 60)",
      pruple: "rgba(19, 27, 58, 1)",
    },
  },
  fonts,
});

export default theme;
