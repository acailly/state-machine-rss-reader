import { ActorRefFrom, createMachine, StateFrom, StateMachine } from 'xstate'

import { Feed, NewsItem } from './types'

export type SubMachineName = 'abonnements' | 'nouveautes' | 'telecharger'

export interface Context {
  abonnement?: Feed
  abonnements?: Feed[]
  article?: NewsItem
  viderFormulaireFlag?: number
  téléchargements?: { feedKey: string; actor: ActorRefFrom<Machine> }[]
  error?: string
}

export type Event =
  // see https://xstate.js.org/docs/guides/communication.html#promise-rejection
  | { type: 'error.platform'; data: string }
  | { type: 'ABONNEMENTS' }
  | { type: 'SAUVEGARDE' }
  | { type: 'TELECHARGER' }
  | { type: 'NOUVEAUTES' }
  | { type: 'Supprimer un abonnement'; abonnement: Feed }
  | { type: 'Ajouter un abonnement' }
  | { type: 'Abonnement RSS' }
  | { type: 'Abonnement Twitter' }
  | { type: 'Validation flux RSS'; abonnement: Feed }
  | { type: 'Validation flux Twitter'; abonnement: Feed }
  | { type: 'Retour à la liste des abonnements' }
  | { type: 'Marquer une nouveauté comme lue'; article: NewsItem }
  | { type: 'Marquer un abonnement comme lu'; abonnement: Feed }
  // see https://xstate.js.org/docs/guides/communication.html#invoking-promises
  | { type: 'done.invoke.récupérerListeAbonnements'; data: Feed[] }

export type EventType = Event['type']

export type Typestate =
  | {
      value: 'Nouveautés'
      context: Context
    }
  | {
      value: 'Abonnements'
      context: Context
    }
  | {
      value: 'Liste des nouveautés'
      context: Context
    }
  | {
      value: 'Liste des abonnements'
      context: Context
    }
  | {
      value: "Suppression d'un abonnement"
      context: Context & {
        abonnement: Feed
      }
    }
  | {
      value: 'Choix du nouvel abonnement'
      context: Context
    }
  | {
      value: 'Nouvel abonnement RSS'
      context: Context
    }
  | {
      value: "Création d'un abonnement RSS"
      context: Context & {
        abonnement: Feed
      }
    }
  | {
      value: 'Nouvel abonnement Twitter'
      context: Context
    }
  | {
      value: "Création d'un abonnement Twitter"
      context: Context & {
        abonnement: Feed
      }
    }
  | {
      value: "Archivage d'une nouveauté"
      context: Context & {
        article: NewsItem
      }
    }
  | {
      value: "Archivage de toutes les nouveautés d'un abonnement"
      context: Context & {
        abonnement: Feed
      }
    }
  | {
      value: 'En cours de téléchargement'
      context: Context
    }
  | {
      value: 'Téléchargement réussi'
      context: Context
    }
  | {
      value: 'Téléchargement échoué'
      context: Context
    }
  | {
      value: 'Choix du type de sauvegarde'
      context: Context
    }

const fakeMachine = createMachine<Context, Event, Typestate>({})
export type Options = typeof fakeMachine.options
export type Actions = Options['actions']
export type Services = Options['services']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Machine = StateMachine<Context, any, Event, Typestate>

export type StateKey = Typestate['value']
export type StateMeta = StateFrom<Machine>['meta']
