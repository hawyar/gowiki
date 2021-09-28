import {
  Box,
  useColorMode,
  FlexProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export const QuickAccess = (props: FlexProps) => {
  const { colorMode } = useColorMode();

  const bg = useColorModeValue("red.100", "orange.900");

  return (
    <Box px={5} py={6} w="220px" h="120px" bg={bg}>
      <Text letterSpacing="-.6px" fontSize="" fontWeight="semibold">
        Documentation
      </Text>
    </Box>
  );
};
