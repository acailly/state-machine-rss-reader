import { useToast } from '@chakra-ui/react'
import { useMemo } from 'react'
import { assign } from 'xstate'

import useAbsoluteNavigate from '../MachineProvider/useAbsoluteNavigate'
import baseUrl from '../allMachines/baseUrl'
import { Actions, Context, Event } from '../machine.types'

const useNouveautesMachineActions = () => {
  const navigate = useAbsoluteNavigate()
  const toast = useToast()

  const actions: Actions = useMemo(() => {
    return {
      afficherPageNouveautes: () => {
        navigate(`${baseUrl}news`)
      },
      contexteAbonnement: assign((context: Context, event: Event) => {
        if ('abonnement' in event) {
          return {
            abonnement: event.abonnement,
          }
        }
        return {}
      }),
      contexteArticle: assign((context: Context, event: Event) => {
        if ('article' in event) {
          return {
            article: event.article,
          }
        }
        return {}
      }),
      messageNouveautéArchivée: () => {
        toast.closeAll()
        toast({
          title: 'Article archivé',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      },
      messageArchivageNouveautéEchoué: (context: Context, event: Event) => {
        const error = event.type === 'error.platform' ? event.data : undefined
        toast({
          title: "Echec lors de l'archivage de l'article",
          description: error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      },
      messageNouveautésArchivées: () => {
        toast.closeAll()
        toast({
          title: 'Articles archivés',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      },
      messageArchivageAbonnementEchoué: (context: Context, event: Event) => {
        const error = event.type === 'error.platform' ? event.data : undefined
        toast({
          title: "Echec lors de l'archivage des articles",
          description: error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      },
    }
  }, [navigate, toast])

  return actions
}

export default useNouveautesMachineActions
