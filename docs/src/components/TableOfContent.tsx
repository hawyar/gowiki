import {
	Box,
	useColorMode,
	FlexProps,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

export const TableOfContent = (props: any) => {
	const { colorMode } = useColorMode();

	const bg = useColorModeValue("gray.400", "gray.700");

	return (
		<Box
			justifyContent="space-between"
			position="fixed"
			top={0}
			w="100%"
			px={5}
			py={6}
			bg="red.400"
		>
			<Text letterSpacing="-.6px" fontSize="" fontWeight="semibold">
				Documentation
			</Text>
		</Box>
	);
};
