import { ExternalLinkIcon } from '@chakra-ui/icons'
import { List, ListItem, Heading, Stack, Container, Link, Button, Text } from '@chakra-ui/react'
import { useLiveQuery } from 'dexie-react-hooks'

import { db } from '../../db'
import { Feed } from '../../types'

import DeleteFeedButton from './RobotDeleteFeedButton'
import useStateMachine from './useStateMachine'

const renderFeed = (feed: Feed) => {
  if (feed.type === 'rss') {
    return (
      <ListItem key={encodeURIComponent(feed.key)}>
        <Stack direction="row" justify="space-between" align="center">
          <Stack direction="column" spacing={0}>
            <Text fontSize="lg">{feed.title}</Text>
            <Link color="blue.500" href={feed.url} isExternal>
              {feed.url} <ExternalLinkIcon mx="2px" />
            </Link>
          </Stack>
          <DeleteFeedButton feed={feed} />
        </Stack>
      </ListItem>
    )
  } else if (feed.type === 'twitter') {
    return (
      <ListItem key={encodeURIComponent(feed.key)}>
        <Stack direction="row" justify="space-between" align="center">
          <Stack direction="column" spacing={0}>
            <Text fontSize="lg">{feed.title}</Text>
            <Text fontSize="xs">Twitter</Text>
          </Stack>
          <DeleteFeedButton feed={feed} />
        </Stack>
      </ListItem>
    )
  } else {
    // @ts-expect-error unknown type
    return <span>Erreur: Le type de feed {feed.type} n&apos;est pas supporté</span>
  }
}

const Feeds = () => {
  const [ state, send ] = useStateMachine()

  const feeds = useLiveQuery(() => db.feeds.toArray())

  const canAddFeed = !!state.value.transitions.get('Ajouter un abonnement')

  return (
    <Container maxW="container.lg">
      <Stack spacing={6}>
        <Stack direction="row" spacing={4} justify="space-between">
          <Heading>Abonnements</Heading>
          <Button
            colorScheme="blue"
            variant="solid"
            disabled={!canAddFeed}
            onClick={() => send({ type: 'Ajouter un abonnement' })}
          >
            Ajouter un abonnement
          </Button>
        </Stack>
        <List spacing={4}>{feeds?.map(renderFeed)}</List>
      </Stack>
    </Container>
  )
}

export default Feeds
