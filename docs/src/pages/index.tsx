import {
	Link,
	Box,
	Flex,
	Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import useSWR from "swr";
import { Sidebar } from "../components/Sidebar";
import { getAllContents } from "../lib/api";
import { QuickAccess } from "../components/QuickAccess";
import { Greeting } from "../components/Greeting";

const Index = ({ allContent }) => {
	const docs = [
		{
			title: "Getting Started",
			slug: "/",
			pages: [
				{
					title: "Installation",
					slug: "/",

				},
				{
					title: "Usage",
					slug: "/",
				},
				{
					title: "Customization",
					slug: "/",
				}
			]
		},
		{
			title: "Components",
			slug: "/",
			pages: [
				{
					title: "Installation",
					slug: "/",

				},
				{
					title: "Usage",
					slug: "/",
				},
				{
					title: "Customization",
					slug: "/",

				}
			]
		},
		{
			title: "Utilities",
			slug: "/",
			pages: [
				{
					title: "Installation",
					slug: "/",
				},
				{
					title: "Usage",
					slug: "/",

				},
				{
					title: "Dark Mode",
					slug: "/",
				}
			]
		},
		{
			title: "Core Concepts",
			slug: "/",
			pages: [
				{
					title: "Installation",
					slug: "/",
				},
			]
		},
		{
			title: "Components",
			slug: "/",
			pages: [
				{
					title: "Installation",
					slug: "/",

				},
				{
					title: "Usage",
					slug: "/",
				},
				{
					title: "Customization",
					slug: " / ",

				}
			]
		},
	]

	const sideBar = docs.concat(docs)
	const user = "Hawyar"

	return (
		<Box>
			<Nav />
			<Sidebar docs={sideBar} />
			<Box

				w={["100%", "100%", "calc(100% - (-220px))"]}
				minH={["100vh", null, null]}
				position="relative"
				left={["0px", null, "-220px"]}
				px={[5, 5, 0, 0]}
				bg={["white", "blue.400", "red.300"]}
				zIndex="-33"

			>

				<Stack spacing={5}>
					<Box pt="90px" pl={[null, null, 5, "460px"]}>
						<Greeting greet={user} />
					</Box>
				</Stack>
			</Box>
		</Box >
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
