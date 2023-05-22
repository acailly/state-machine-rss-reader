import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import { useCallback } from 'react'

import { useStateMachine } from '../MachineProvider'
import { Feed } from '../types'

interface DeleteFeedButtonProps {
  feed: Feed
}

const DeleteFeedButton = ({ feed }: DeleteFeedButtonProps) => {
  const { state, send } = useStateMachine('abonnements')

  const canDeleteFeed = state.nextEvents.includes('Supprimer un abonnement')
  const isLoading = state.matches("Suppression d'un abonnement")

  const deleteFeed = useCallback(() => {
    send({ type: 'Supprimer un abonnement', abonnement: feed })
  }, [feed, send])

  return (
    <>
      <Popover colorScheme="blue">
        <PopoverTrigger>
          <Button colorScheme="blue" variant="outline" size="xs" disabled={!canDeleteFeed}>
            Supprimer
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton colorScheme="blue" />
          <PopoverBody>Êtes vous sur de vouloir supprimer cet abonnement ?</PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button colorScheme="red" isLoading={isLoading} onClick={deleteFeed}>
                Supprimer
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default DeleteFeedButton
