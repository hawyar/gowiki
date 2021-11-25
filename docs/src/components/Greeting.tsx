import { Flex, Heading } from '@chakra-ui/react'

export const Greeting = ({ greet }: { greet: string }) => (
	<Flex
		bg="red.400"
	>
		<Heading fontSize="xl"></Heading>
		<Heading as="h1" size="lg" fontWeight="bold" color="gray.800">Welcome to the team, {greet}</Heading>
	</Flex>
)

Greeting.defaultProps = {
	greet: '',
}
