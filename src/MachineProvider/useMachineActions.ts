import { useToast } from '@chakra-ui/react'
import { useMemo } from 'react'
import { assign, spawn } from 'xstate'

import { Actions, Context, Event } from '../machine.types'
import baseUrl from '../services/baseUrl'

import useAbsoluteNavigate from './useAbsoluteNavigate'
import useCreateTelechargerUnAbonnementMachine from './useCreateTelechargerUnAbonnementMachine'

// FIXME découper par machine pour montrer la scalabilité ?
const useMachineActions = () => {
  const navigate = useAbsoluteNavigate()
  const toast = useToast()
  const { createTelechargerUnAbonnementMachine } = useCreateTelechargerUnAbonnementMachine()
  
  const actions: Actions = useMemo(() => {
    return {
      afficherPageNouveautes: () => {
        navigate(`${baseUrl}news`)
      },
      afficherPageSauvegarde: () => {
        navigate(`${baseUrl}backup`)
      },
      afficherPageTelechargement: () => {
        navigate(`${baseUrl}feeds/fetching`)
      },
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
      contexteAbonnements: assign((context: Context, event: Event) => {
        // FIXME : un peu relou d'avoir à spécifier ca directement
        if (event.type === 'done.invoke.récupérerListeAbonnements') {
          return {
            abonnements: event.data,
          }
        }
        return {}
      }),
      téléchargerNouveautés: assign((context: Context) => {
        // Inspiré par l'exemple TodoMVC : https://codesandbox.io/s/xstate-todomvc-33wr94qv1?from-embed
        return {
          téléchargements: context.abonnements?.map((abonnement) => {
            const téléchargement = {
              feedKey: abonnement.key,
              actor: spawn<Context, Event>(createTelechargerUnAbonnementMachine(abonnement)),
            }
            return téléchargement
          }),
        }
      }),
      contexteErreur: assign((context: Context, event: Event) => {
        if (event.type === 'error.platform') {
          return {
            error: event.data,
          }
        }
        return {}
      }),
    }
  }, [createTelechargerUnAbonnementMachine, navigate, toast])

  return actions
}

export default useMachineActions
