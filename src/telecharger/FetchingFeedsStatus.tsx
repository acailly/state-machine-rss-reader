import { List, ListItem, Heading, Stack, Container, Button } from '@chakra-ui/react'
import { useLiveQuery } from 'dexie-react-hooks'

import { useStateMachine } from '../MachineProvider'
import { db } from '../db'

import FetchingFeedStatus from './telechargerUnAbonnement/FetchingFeedStatus'

const FetchingFeedsStatus = () => {
  const feeds = useLiveQuery(() => db.feeds.toArray())

  const { send } = useStateMachine()

  return (
    <Container maxW="container.md">
      <Stack spacing={6}>
        <Stack direction="row" spacing={4} justify="space-between">
          <Heading>Récupération des nouveautés</Heading>
        </Stack>
        <List spacing={4}>
          {feeds?.map((feed) => {
            return (
              <ListItem key={encodeURIComponent(feed.key)}>
                <FetchingFeedStatus feed={feed} />
              </ListItem>
            )
          })}
        </List>
        <Button colorScheme="blue" variant="solid" onClick={() => send({ type: 'NOUVEAUTES' })}>
          Aller voir les nouveautés !
        </Button>
        <Button colorScheme="blue" variant="outline" onClick={() => send({ type: 'TELECHARGER' })}>
          Récupérer à nouveau les nouveautés
        </Button>
      </Stack>
    </Container>
  )
}

export default FetchingFeedsStatus
