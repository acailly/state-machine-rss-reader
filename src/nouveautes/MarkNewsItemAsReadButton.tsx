import { CheckIcon } from '@chakra-ui/icons'
import { Button, Stack, Text } from '@chakra-ui/react'
import { useCallback } from 'react'

import { useStateMachine } from '../MachineProvider'
import { NewsItem } from '../types'

interface MarkNewsItemAsReadButtonProps {
  newsItem: NewsItem
}

const MarkNewsItemAsReadButton = ({ newsItem }: MarkNewsItemAsReadButtonProps) => {
  const { state, send } = useStateMachine('nouveautes')

  const canMarkItemAsRead = state.nextEvents.includes('Marquer une nouveauté comme lue')
  const isLoading = state.matches("Archivage d'une nouveauté") && state.context.article === newsItem

  const markNewsItemAsRead = useCallback(() => {
    send({ type: 'Marquer une nouveauté comme lue', article: newsItem })
  }, [newsItem, send])

  return (
    <Button
      colorScheme="blue"
      variant="outline"
      minW="20"
      size="xs"
      disabled={!canMarkItemAsRead}
      isLoading={isLoading}
      onClick={markNewsItemAsRead}
    >
      <Stack direction="row" spacing={1} align="center">
        <Text>Lu</Text> <CheckIcon />
      </Stack>
    </Button>
  )
}

export default MarkNewsItemAsReadButton
