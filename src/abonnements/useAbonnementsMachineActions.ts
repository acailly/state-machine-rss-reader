import { useToast } from '@chakra-ui/react'
import { useMemo } from 'react'
import { assign } from 'xstate'

import useAbsoluteNavigate from '../MachineProvider/useAbsoluteNavigate'
import baseUrl from '../allMachines/baseUrl'
import { Actions, Context, Event } from '../machine.types'

const useAbonnementsMachineActions = () => {
  const navigate = useAbsoluteNavigate()
  const toast = useToast()

  const actions: Actions = useMemo(() => {
    return {
      afficherPageListeAbonnements: () => {
        navigate(`${baseUrl}feeds`)
      },
      afficherPageNouvelAbonnement: () => {
        navigate(`${baseUrl}feeds/new`)
      },
      afficherPageNouvelAbonnementRSS: () => {
        navigate(`${baseUrl}feeds/new/rss`)
      },
      afficherPageNouvelAbonnementTwitter: () => {
        navigate(`${baseUrl}feeds/new/twitter`)
      },
      contexteAbonnement: assign((context: Context, event: Event) => {
        if ('abonnement' in event) {
          return {
            abonnement: event.abonnement,
          }
        }
        return {}
      }),
      messageAbonnementSupprimé: () => {
        toast({
          title: 'Abonnement supprimé',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      },
      messageSuppressionAbonnementEchoué: (context: Context, event: Event) => {
        const error = event.type === 'error.platform' ? event.data : undefined
        toast({
          title: "Echec lors de la suppression de l'abonnement",
          description: error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      },
      messageAbonnementCréé: () => {
        toast({
          title: 'Abonnement ajouté',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      },
      messageCréationAbonnementEchoué: (context: Context, event: Event) => {
        const error = event.type === 'error.platform' ? event.data : undefined
        toast({
          title: "Echec lors de l'ajout de l'abonnement",
          description: error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      },
      viderFormulaireAbonnement: assign((context: Context) => {
        return { ...context, viderFormulaireFlag: new Date().getTime() }
      }),
    }
  }, [navigate, toast])

  return actions
}

export default useAbonnementsMachineActions
