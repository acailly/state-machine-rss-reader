import { CheckIcon } from '@chakra-ui/icons'
import { Button, Stack, Text } from '@chakra-ui/react'
import { useCallback } from 'react'

import { useStateMachine } from '../MachineProvider'
import { Feed } from '../types'

interface MarkFeedNewsItemAsReadButtonProps {
  feed: Feed
}

const MarkFeedNewsItemAsReadButton = ({ feed }: MarkFeedNewsItemAsReadButtonProps) => {
  const { state, send } = useStateMachine('nouveautes')

  const canMarkItemsAsRead = state.nextEvents.includes('Marquer un abonnement comme lu')
  const isLoading =
    state.matches("Archivage de toutes les nouveautés d'un abonnement") && state.context.abonnement === feed

  const markFeedNewsItemAsRead = useCallback(() => {
    send({ type: 'Marquer un abonnement comme lu', abonnement: feed })
  }, [feed, send])

  return (
    <Stack direction="row" spacing={1} align="center" justify="center">
      <Button
        colorScheme="blue"
        variant="outline"
        minW="20"
        size="xs"
        disabled={!canMarkItemsAsRead}
        isLoading={isLoading}
        onClick={markFeedNewsItemAsRead}
      >
        <Stack direction="row" spacing={1} align="center">
          <Text>Marquer tout comme lu</Text> <CheckIcon />
        </Stack>
      </Button>
    </Stack>
  )
}

export default MarkFeedNewsItemAsReadButton
