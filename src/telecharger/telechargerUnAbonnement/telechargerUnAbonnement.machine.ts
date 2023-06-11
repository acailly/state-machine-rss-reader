import { createMachine } from 'xstate'

import { Context, Event, Typestate } from '../../machine.types'

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcwBswGMAWBDATjPgKoB2AggEYD2ppYAtmKcgHQCipABJtQK75YXCGC7IAl2nE4CMJiwDEEWmFYBLUgDdqAa1WoMMwmBIUadRszace-QcNESpRuVYQbtmXMjW0A2gAMALqBQYigAA7UsGo+tOEgAB6IAMwAbCmsAKwALACcASl5WQCMOSVpADQgAJ6IAEw5mQUBASUlKSmlrXkAvr3VBlh4xqZUtPTy1ty8AkIiYpLSI66KJvjU+KwRaN4AZpsMrEMuJmTjFlMcM3bzjkunU+5a1F5xpKGhCVEx7wnJCFyrGKbXq9TyjQA7AAOMr1LLVOoIFIlaHZSFpaFZaFpNIlYrpfoDECkagieBIEAnFZnMwTSwsa62OYORbOGlTb7RWK+Uj-RA5aGIxBlHL9QboYayWkXSZWVgAFQeHKsXHw4j4sBiXN+vP5yOh9VYkLykMhjXqnTyBXqkOFCByrVYKVaAWxkIC0ICaTyOPFVMlpzG5jljKV7OlUy4y344h1PPilIBkMy6WhkOxONNYMK9py2ONxXKOXqAXNWR9-up0uD9M5lJ+Cb5ScQAXtQOtnbSmcNATBRN6QA */
  createMachine<Context, Event, Typestate>({
    context: {},
    predictableActionArguments: true,
    initial: 'En cours de téléchargement',
    states: {
      'En cours de téléchargement': {
        entry: 'partageEtatCourant',
        invoke: {
          src: 'téléchargerAbonnement',
          onDone: [
            {
              target: 'Téléchargement réussi',
            },
          ],
          onError: [
            {
              target: 'Téléchargement échoué',
              actions: 'contexteErreur',
            },
          ],
        },
      },
      'Téléchargement réussi': {
        entry: 'partageEtatCourant',
      },
      'Téléchargement échoué': {
        entry: 'partageEtatCourant',
      },
    },
    id: 'telechargerUnAbonnement',
  })

export default machine
