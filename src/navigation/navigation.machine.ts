import { createMachine } from 'xstate'

import { Context, Event, Typestate } from '../machine.types'

// FIXME quand https://github.com/statelyai/studio-issues/issues/130 aura été résolue,
// passer les transitions en externe pour qu'elles s'exécutent même si on est déjà dans l'état

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqA2BLAxsgLlgPYB2AxACoCiAMlQMIASAggEoDiVrA2gAwC6iUKiKwshUkJAAPRADYAjADoATABYAHAHZeCjXICcGgKxaDAGhABPRMbVqlBgwoObjAZnfGFWuQF8-SzRMXAJicmYAIQB5ADlYqgBZKliKAGU+QSQQETEJEilZBBU5DUded18DY14SnQ1LGwQFY2MlLRUtNV57YxMFew0AoPRsPHyyNOYAVQA1KnY2ABEqTKlc8XDC+RLHUwrOjRatdzlGxBa2jq6etT7vQeGQYLGw0jJY6LmqGeoMgXWok2kmyRQAtApeG17FoFHIenISjUKudmu4VEoNJovCcVBp3N1SgFAiASEQIHApC9QvlAXktqDEGCVJClHC1FpYbwdE4Tg1rIg1O52tjvIjeLV1FCntTxuElLEiABXABuYGQSvwAEv4NkNrTGQgIYi2XIOVyeQY+aiVK02ZpugY5DUTFC1DLRjT5cwAEakEhgAC2YBI+F1wiBBtART0bXhcPhR3cVruKhtJvcvFcnIMma0NS0HpCctISjSGrVUGQACcKXTgQVDaYHMYWV4PEZanJ3Omyl0sZ1DGoVF33EXXvklBQtRgwDgABY1mDVgAEs9gK7JqvVmp19ajMkQnjKUIlzoULk8JTOAoQHgcLS8ChUtqcvH0xL8QA */
  createMachine<Context, Event, Typestate>({
    context: {},
    predictableActionArguments: true,
    on: {
      TELECHARGER: {
        target: '.Télecharger les nouveautés',
      },
      ABONNEMENTS: {
        target: '.Abonnements',
        internal: false,
      },
      SAUVEGARDE: {
        target: '.Sauvegarde',
      },
      NOUVEAUTES: {
        target: '.Nouveautés',
      },
    },
    initial: 'Nouveautés',
    states: {
      Nouveautés: {
        invoke: {
          src: 'nouveautes',
          id: 'nouveautes',
        },
      },
      Abonnements: {
        invoke: {
          src: 'abonnements',
          id: 'abonnements',
        },
      },
      Sauvegarde: {
        invoke: {
          src: 'sauvegarde',
          id: 'sauvegarde',
        },
      },
      'Télecharger les nouveautés': {
        invoke: {
          src: 'telecharger',
          id: 'telecharger',
        },
      },
    },
    id: 'navigation',
  })

export default machine
