import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
const Index = () => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		// fetch the user from the go server
		fetch('api/me')
			.then(res => res.json())
			.then(user => {
				setUser(user)
			}
		)
	}, [])

	return (
		<div>
			<a href="api/github"> login </a>
			<a href="api/github"> logout </a>

			{ user ? JSON.stringify(user, null, 2) : 'unauthorized' }
		</div>
	)
}

export default Index
