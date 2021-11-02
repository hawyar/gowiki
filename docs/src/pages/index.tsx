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
        <Sidebar docs={allContent} />
        <Box bg={bg} pl={56}>
          <Stack direction="column" spacing="24px">
            <Heading letterSpacing="-1px" size="xl" fontWeight="bold" pt={16}>
              Welcome to the docs!
            </Heading>
            <Box pt="16">
              <QuickAccess />
            </Box>
          </Stack>
        </Box>
        <Flex
          // Nav is ~49px tall
          position="fixed"
          top={"48px" + 12}
          right="12em"
          direction="column"
          spacing="24px"
        >
          <Text
            letterSpacing="-.3px"
            fontSize="md"
            fontWeight="semibold"
            pt={8}
          >
            Table of Content
          </Text>
          <Box pt={4}>
            {allContent.map((doc) => {
              return (
                <Text key={doc.slug}>
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
