import {
  Box,
  useColorMode,
  FlexProps,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

interface Doc {
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  status: string;
  author: { name: string; picture: string };
  ogImage: { url: string };
  slug: string;
}

export const Sidebar = ({ docs }: { docs: Array<Doc> }) => {
  console.log(docs);
  const { colorMode } = useColorMode();

  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Box
      px={5}
      py={6}
      w={["100%", "220px"]}
      minHeight="100vh"
      position="fixed"
	  bg={bg}
	  zIndex={1}
	  flexShrink={0}
    >
      {docs.map((doc: Doc) => {
        return (
          <Text key={doc.slug} letterSpacing="-.1px" fontWeight="medium" pt="6">
            <Link href={`${doc.slug}`}>{doc.title}</Link>
          </Text>
        );
      })}
    </Box>
  );
};
