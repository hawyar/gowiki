import {
  Flex,
  Avatar,
  Tag,
  useColorMode,
  FlexProps,
  Text,
  TagLabel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Button,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const Nav = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("brand.black", "brand.purple");
  const color = useColorModeValue("brand.white", "brand.black");
  const border = useColorModeValue("1px solid #e6e6e6", "1px solid #2D3748");
  return (
    <Flex
      px={5}
      py={2}
      direction="column"
      alignItems="start"
      justifyContent="space-between"
      {...props}
      position="fixed"
      top={0}
      w="100%"
      overflow="hidden"
      borderBottom={border}
    >
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
      >
        <Logo />
        <Box display="flex" flexDirection="row" alignItems="center">
          <IconButton
            onClick={toggleColorMode}
            aria-label="Search database"
            size="sm"
            mr={4}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />

          <Box size="lg" borderRadius="full" display="flex">
            <Avatar
              src="https://avatars.githubusercontent.com/u/42186608?v=4"
              size="xs"
              name="Hawyar Fa"
              ml={-1}
              mr={2}
            />
            <Text letterSpacing="-.6px" fontWeight="normal">
              Hawyar
            </Text>
          </Box>
        </Box>
      </Flex>

      <Box></Box>
    </Flex>
  );
};

const Logo = () => {
  return (
    <Text fontSize="md" fontWeight="semibold" letterSpacing="tight">
      Consensus Networks
    </Text>
  );
};
