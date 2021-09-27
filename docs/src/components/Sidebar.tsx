import { Box, useColorMode, FlexProps } from "@chakra-ui/react";

export const Sidebar = (props: FlexProps) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.50", dark: "gray.900" };

  const color = { light: "black", dark: "white" };
  return (
    <Box
      px={5}
      py={6}
      w={["100%", "180px"]}
      h="100vh"
      bg="red.200"
      color={color}
    ></Box>
  );
};
