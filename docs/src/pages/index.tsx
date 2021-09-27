import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  HStack,
  Box,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import useSWR from "swr";
import { Sidebar } from "../components/Sidebar";

const Index = () => {
  //   const fetcher = (args) => fetch(args).then((res) => res.json());

  //   const { data, error } = useSWR("/api/me", fetcher);

  //   if (error) return <div>failed to load</div>;
  //   if (!data) return <div>loading...</div>;

  const bg = useColorModeValue("brand.black", "brand.purple");
  const color = useColorModeValue("brand.white", "brand.black");

  return (
    <div>
      <Nav />
      <Stack direction={["column", "row"]} spacing="0px" pt={12}>
        <Sidebar />
      </Stack>
    </div>
  );
};

export default Index;

// <Stack direction={["column", "row"]} spacing="0px" pt={12}>
//       <Box
//         px={5}
//         py={6}
//         w={["100%", "170px"]}
//         h="100vh"
//         bg={bg}
//         color={color}
//       >
//         <Text letterSpacing="-1" fontWeight="semi">
//           Introduction
//         </Text>
//       </Box>
//       <Box bg={bg} flexGrow={3} pl={12} pr={6} py={6}>
//         <Text letterSpacing="-1px" fontSize="3xl" fontWeight="bold">
//           Welcome to the teams docs!
//         </Text>
//         {/* <Box>{data && JSON.stringify(data, null, 2)}</Box> */}
//       </Box>
//       <Box bg={bg} flexGrow={1} px={5} py={6}>
//         3
//       </Box>
//     </Stack>
