import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  HStack,
  Heading,
  Box,
  SimpleGrid,
  Stack,
  Flex,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import useSWR from "swr";
import { Sidebar } from "../components/Sidebar";
import { getAllContents } from "../lib/api";
import { QuickAccess } from "../components/QuickAccess";
const Index = ({ allContent }) => {
  console.log(allContent);

  //   const fetcher = (args) => fetch(args).then((res) => res.json());

  //   const { data, error } = useSWR("/api/me", fetcher);

  //   if (error) return <div>failed to load</div>;
  //   if (!data) return <div>loading...</div>;

  // const bg = useColorModeValue("gray.50", "gray.800");
  // const color = useColorModeValue("brand.white", "brand.black");
  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <div>
      <Nav />
      <Stack direction={["column", "row"]} spacing={16} pt={12} bg={bg}>
        <Sidebar />
        <Box bg={bg} py={6}>
          <Stack direction="column" spacing="24px">
            <Heading letterSpacing="-1px" size="2xl" fontWeight="bold" pt={8}>
              Welcome to the docs team!
            </Heading>
            <Box>
              <QuickAccess />
            </Box>
          </Stack>
          {/*{JSON.stringify(heroPost, null, 2)}*/}
        </Box>
        <Flex bg={bg} py={6} pl={32} direction="column" spacing="24px">
          <Text letterSpacing="-.3px" fontSize="md" fontWeight="medium" pt={8}>
            Table of Content
          </Text>
          <Box pt={4}>
            {allContent.map((doc) => {
              return (
                <Text>
                  <Link color="teal.500" href={`docs/${doc.slug}`}>
                    {doc.title}
                  </Link>
                </Text>
              );
            })}
          </Box>
        </Flex>
      </Stack>
    </div>
  );
};

export default Index;

export async function getStaticProps() {
  const allContent = getAllContents([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allContent },
  };
}
