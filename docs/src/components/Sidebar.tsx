import {
	Box,
	useColorMode,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";
import NextLink from "next/link"



export const Sidebar = ({ docs }) => {

	const { colorMode, toggleColorMode } = useColorMode();

	const bg = useColorModeValue("gray.50", "gray.800");
	const color = useColorModeValue("brand.white", "brand.black");
	const border = useColorModeValue("1px solid #e6e6e6", "1px solid #2D3748");

	return (
		<Box
			px={5}
			py={20}
			w={["100%", "220px"]}
			minHeight="100vh"
			position="fixed"
			overflow="auto"
			top="0"
			bg={bg}
			left="0"
			right="0"
			bottom="0"
			borderRight={border}
			zIndex={1}
			flexShrink={0}
		>
			{docs.map((doc: any, i) => {
				return (
					<Box mt={i === 0 ? "6" : "12"}>
						<NextLink key={doc.slug} href={`/docs/${doc.slug}`} passHref>
							<Link letterSpacing="-.1px" fontWeight="medium" fontSize="lg">{doc.title}</Link>
						</NextLink>

						<Box mt="4" >
							{doc.pages.map((page: any) => {
								return (
									<Box mt="3">
										<NextLink key={page.slug} href={`/docs/${page.slug}`} passHref>
											<Link letterSpacing="-.1px" fontWeight="400" fontSize="16px">{page.title}</Link>
										</NextLink>
									</Box>
								)
							})}
						</Box>
					</Box>

				);
			})}
		</Box>
	);
};
