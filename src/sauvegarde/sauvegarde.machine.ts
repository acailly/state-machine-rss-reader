import { createMachine } from 'xstate'

import { Context, Event, Typestate } from '../machine.types'

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGmwFcA3MAQ0IBc4A6AYQAssBLADwAIJD3KBPABzCchsCqShkATrnwh+WWM0rMsGWa0QAGdL0QBOAGzI0mLCXJU8SOQqUq11jQgC0AFgAcOxAZp6-fgwBWdxCAJk1Q0NdjYyA */
  createMachine<Context, Event, Typestate>({
    context: {},
    predictableActionArguments: true,
    initial: 'Choix du type de sauvegarde',
    states: {
      'Choix du type de sauvegarde': {
        entry: 'afficherPageSauvegarde',
      },
    },
    id: 'sauvegarde',
  })

export default machine
