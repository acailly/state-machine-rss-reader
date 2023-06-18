import { useToast } from '@chakra-ui/react'
import { createMachine, state, transition, invoke, reduce, action, immediate, guard, interpret } from 'robot3'

import useAbsoluteNavigate from '../MachineProvider/useAbsoluteNavigate'
import baseUrl from '../allMachines/baseUrl'
import { db } from '../db'
import { Context } from '../machine.types'

type SuccessEvent = { type: 'done'; data: any }
type ErrorEvent = { type: 'error'; error: any }

type Event = SuccessEvent | ErrorEvent | ({ type: string } & any) | string

const useAbonnementMachine = () => {
  const toast = useToast()
  const navigate = useAbsoluteNavigate()

  // Context

  const context = (initialContext: Context) => ({ ...initialContext })

  // Actions

  const contexteAbonnement = reduce((context: Context, event: Event) => ({
    ...context,
    abonnement: event.data.abonnement,
  }))

  const messageAbonnementSupprimé = action(() => {
    toast({
      title: 'Abonnement supprimé',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  })

  const messageSuppressionAbonnementEchoué = action((context: Context, event: ErrorEvent) => {
    toast({
      title: "Echec lors de la suppression de l'abonnement",
      description: event.error,
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  })

  const messageAbonnementCréé = action(() => {
    toast({
      title: 'Abonnement ajouté',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  })

  const messageCréationAbonnementEchoué = action((context: Context, event: ErrorEvent) => {
    toast({
      title: "Echec lors de l'ajout de l'abonnement",
      description: event.error,
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  })

  const viderFormulaireAbonnement = reduce((context: Context) => ({
    ...context,
    viderFormulaireFlag: new Date().getTime(),
  }))

  const afficherPageListeAbonnements = action(() => {
    navigate(`${baseUrl}feeds`)
  })

  const afficherPageNouvelAbonnement = action(() => {
    navigate(`${baseUrl}feeds/new`)
  })

  const afficherPageNouvelAbonnementRSS = action(() => {
    navigate(`${baseUrl}feeds/new/rss`)
  })

  const afficherPageNouvelAbonnementTwitter = action(() => {
    navigate(`${baseUrl}feeds/new/twitter`)
  })

  // Services

  const supprimerAbonnement = (context: Context) => {
    const { abonnement } = context
    if (!abonnement) {
      return Promise.reject()
    }

    return db.feeds.where('key').equals(abonnement.key).delete()
  }

  const créerAbonnement = (context: Context) => {
    const { abonnement } = context
    if (!abonnement) {
      return Promise.reject()
    }

    return db.feeds.add(abonnement)
  }

  // Guards

  const urlInclude = (url: string) =>
    guard(() => {
      return window.location.pathname.includes(url)
    })

  // Machine

  const machine = createMachine(
    'Initialisation',
    {
      Initialisation: state(
        immediate('Redirection - Nouvel abonnement RSS', urlInclude('/feeds/new/rss')),
        immediate('Redirection - Nouvel abonnement Twitter', urlInclude('/feeds/new/twitter')),
        immediate('Redirection - Choix du nouvel abonnement', urlInclude('/feeds/new')),
        immediate('Redirection - Liste des abonnements')
      ),
      'Redirection - Liste des abonnements': state(
        immediate('Liste des abonnements', afficherPageListeAbonnements)
      ),
      'Liste des abonnements': state(
        transition('Supprimer un abonnement', "Suppression d'un abonnement", contexteAbonnement),
        transition('Ajouter un abonnement', 'Redirection - Choix du nouvel abonnement')
      ),
      'Redirection - Choix du nouvel abonnement': state(
        immediate('Choix du nouvel abonnement', afficherPageNouvelAbonnement),
      ),
      'Choix du nouvel abonnement': state(
        transition('Abonnement RSS', 'Redirection - Nouvel abonnement RSS'),
        transition('Abonnement Twitter', 'Redirection - Nouvel abonnement Twitter')
      ),
      'Redirection - Nouvel abonnement RSS': state(
        immediate('Nouvel abonnement RSS', afficherPageNouvelAbonnementRSS),
      ),
      'Nouvel abonnement RSS': state(
        transition('Validation flux RSS', "Création d'un abonnement RSS", contexteAbonnement),
        transition('Retour à la liste des abonnements', 'Redirection - Liste des abonnements')
      ),
      'Redirection - Nouvel abonnement Twitter': state(
        immediate('Nouvel abonnement Twitter', afficherPageNouvelAbonnementTwitter),
      ),
      'Nouvel abonnement Twitter': state(
        transition('Validation flux Twitter', "Création d'un abonnement Twitter", contexteAbonnement),
        transition('Retour à la liste des abonnements', 'Redirection - Liste des abonnements')
      ),
      "Suppression d'un abonnement": invoke(
        supprimerAbonnement,
        transition('done', 'Redirection - Liste des abonnements', messageAbonnementSupprimé),
        transition('error', 'Redirection - Liste des abonnements', messageSuppressionAbonnementEchoué)
      ),
      "Création d'un abonnement RSS": invoke(
        créerAbonnement,
        transition('done', 'Redirection - Nouvel abonnement RSS', messageAbonnementCréé, viderFormulaireAbonnement),
        transition('error', 'Redirection - Nouvel abonnement RSS', messageCréationAbonnementEchoué)
      ),
      "Création d'un abonnement Twitter": invoke(
        créerAbonnement,
        transition('done', 'Redirection - Nouvel abonnement Twitter', messageAbonnementCréé, viderFormulaireAbonnement),
        transition('error', 'Redirection - Nouvel abonnement Twitter', messageCréationAbonnementEchoué)
      ),
    },
    context
  )

  const initialContext: Context = {}

  const onChange = (interpretedMachine) => {
    console.log('[CHANGE]', interpretedMachine)
  }

  const interpretedMachine = interpret(machine, onChange, initialContext)
  return interpretedMachine
}

export default useAbonnementMachine
