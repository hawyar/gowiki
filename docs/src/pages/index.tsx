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
	Grid,
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
	const docs = [
		{
			title: "Getting Started",
			slug: "getting-started",
			pages: [
				{
					title: "Installation",
					slug: "installation",

				},
				{
					title: "Usage",
					slug: "usage",
				},
				{
					title: "Customization",
					slug: "customization",

				}
			]
		},
		{
			title: "Components",
			slug: "components",
			pages: [
				{
					title: "Installation",
					slug: "installation",

				},
				{
					title: "Usage",
					slug: "usage",
				},
				{
					title: "Customization",
					slug: "customization",

				}
			]
		},
		{
			title: "Utilities",
			slug: "utilities",
			pages: [
				{
					title: "Installation",
					slug: "installation",
				},
				{
					title: "Usage",
					slug: "usage",

				},
				{
					title: "Dark Mode",
					slug: "dark-mode",
				}
			]
		},
		{
			title: "Core Concepts",
			slug: "core-concepts",
			pages: [
				{
					title: "Installation",
					slug: "installation",
				}
			]
		},
		{
			title: "Components",
			slug: "components",
			pages: [
				{
					title: "Installation",
					slug: "installation",

				},
				{
					title: "Usage",
					slug: "usage",
				},
				{
					title: "Customization",
					slug: "customization",

				}
			]
		},
	]

	const sideBar = docs.concat(docs)

	// const bg = useColorModeValue("gray.50", "gray.800");

	return (
		<Box>
			<Nav />
			<Sidebar docs={sideBar} />
			<Grid
				templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
				justifyItems="center"
				alignItems="center"
			>
			</Grid>
			{/* <Sidebar docs={allContent} />
        <Box  pl={56}>
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
        </Flex> */}

		</Box>
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
