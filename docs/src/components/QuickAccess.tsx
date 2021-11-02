import {
  Box,
  useColorMode,
  FlexProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export const QuickAccess = (props: FlexProps) => {
  const { colorMode } = useColorMode();

  const bg = useColorModeValue("gray.400", "gray.700");

  return (
    <Box px={5} py={6} w="220px" h="120px" border="1px solid rgba(1,1,1,.09)" borderRadius="base">

      <Text letterSpacing="-.6px" fontSize="" fontWeight="semibold">
        Documentation
      </Text>
    </Box>
  );
};
