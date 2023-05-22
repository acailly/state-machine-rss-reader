import { Flex, Button, Text, Box } from '@chakra-ui/react'

import { useStateMachine } from '../MachineProvider'

const Header = () => {
  const { send } = useStateMachine()

  return (
    <Flex justify="center" align="center" gap={4} p={10} direction="column">
      <Flex justify="center" align="center" gap={20}>
        <Text fontSize="xl" fontWeight="bold">
          <Box as="span" role="img" aria-labelledby="watch" p={1}>
            ⌚
          </Box>
          Dayco
        </Text>
        <Button colorScheme="blue" variant="link" onClick={() => send({ type: 'NOUVEAUTES' })}>
          <Box as="span" role="img" aria-labelledby="megaphone" p={1}>
            📢
          </Box>
          Nouveautés
        </Button>
        <Button colorScheme="blue" variant="link" onClick={() => send({ type: 'ABONNEMENTS' })}>
          <Box as="span" role="img" aria-labelledby="antenna" p={1}>
            📡
          </Box>
          Abonnements
        </Button>
        <Button colorScheme="blue" variant="link" onClick={() => send({ type: 'SAUVEGARDE' })}>
          <Box as="span" role="img" aria-labelledby="package" p={1}>
            📦
          </Box>
          Sauvegarde
        </Button>
      </Flex>
      <Button colorScheme="blue" variant="outline" onClick={() => send({ type: 'TELECHARGER' })}>
        Télécharger les nouveautés
      </Button>
    </Flex>
  )
}

export default Header
