import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons'
import { Spinner, Stack, Text } from '@chakra-ui/react'

import { useStateMachine } from '../../MachineProvider'
import { Feed } from '../../types'

interface FetchFeedProps {
  feed: Feed
}

const FetchingFeedStatus = ({ feed }: FetchFeedProps) => {
  const { state: parentState } = useStateMachine('telecharger')

  const téléchargement = parentState.context.téléchargements?.find(
    (téléchargement) => téléchargement.feedKey === feed.key
  )
  const state = téléchargement?.actor.getSnapshot()

  const isFetching = state?.matches('En cours de téléchargement')
  const isSuccess = state?.matches('Téléchargement réussi')
  const isError = state?.matches('Téléchargement échoué')
  const error = state?.context.error

  return (
    <Stack direction="row" justify="space-between" align="center">
      <Stack direction="column" spacing={0}>
        <Text fontSize="lg">{feed.title}</Text>
        {error && <Text>{error}</Text>}
      </Stack>
      {isFetching && <Spinner color="blue.500" aria-label="téléchargement en cours" />}
      {isSuccess && <CheckIcon color="green" aria-label="téléchargement réussi" />}
      {isError && <WarningTwoIcon color="orange" aria-label="téléchargement échoué" />}
    </Stack>
  )
}

export default FetchingFeedStatus
