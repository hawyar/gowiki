import {
  Box,
  useColorMode,
  FlexProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export const Sidebar = (props: FlexProps) => {
  const { colorMode } = useColorMode();

  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Box px={5} py={6} w={["100%", "180px"]} minHeight="100vh" bg={bg}>
      <Text letterSpacing="-.6px" fontSize="" fontWeight="semibold">
        Documentation
      </Text>
    </Box>
  );
};