import { createMachine } from 'xstate'

import { Context, Event, Typestate } from '../machine.types'

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QDsCGA3AllVAXTA9sgMQAqAogDLkDCAEgIIBKA4uUwNoAMAuoqAAcCsTPiL8QAT0QBaABwB2AHQBWADQgAHogAsKgGwBfQxrRYcYkgwBCAeQBy98gFly90gGVufJCCEjLCWkEGQBGBXUtRAV9LiUAJgiuLgBOUJUVRIBmHWNTDGw8QhIPBgBVADVyFmYAEXJvCX9RYqDZeP141Q1tBFCuBWV+5K59fqyVdKMTEDNCy2J7W0rycoovXibhFvFfYJkJrh7EUKzBpR0zycyVRTkUvNmCi2KlAElkFtQAG0xYIqIxEavmagV8vQyShiWRyoy4oT0OhScki+1CXTkcn02IUOn0KQmWXh0xmyAIEDgEjmL12gm2YNAvRkOjkGn2l2UKhGqXCHUUiUe1IByCU9gIAFd0GBUOLcABL+Ag+mtcGII5SRDxHRcQXPYVKBgAIyIyDAAFswMhcIq6QEVYy1WzdPFQqpdeZ9R4ZVKcAAnClbO20qIIdXBWJZd3zV6kOXfMAAYwAFqhfTBfQACeOwDNkyXS2UKwM7ZASXph6JyHRu0l6yzvT74H5-YXFhkhrIpKFV0LDFJjLL3fROkKhftKLhyDrolJceI5FQKKM0kW4OD4ZAJ77ikTB0H2kC4AgCWRE11Y+I9rgTS5yAYaeMAM1wmv0KiU+kJi8Svan8Q0xq4EeZrtCoWRKBeV43oO94gL62BJi+CCDu+n5gd+Ci-vE-4gAA7pgEC4EmJzxOqSZgAhSEsscCAdKhX4KD+oR-iOBzwhBnRQSot4DMYxhAA */
  createMachine<Context, Event, Typestate>({
    /** @xstate-layout N4IgpgJg5mDOIC5QDsCGA3AllVAXTA9sgMQAqAogDLkDCAEgIIBKA4uUwNoAMAuoqAAcCsTPiL8QAD0QAWAKwA2ADQgAnogC0ADgDsAOjkBfQyrRYcYkgwBCAeQBy98gFly90gGVufJCCEjLCWkEHQUuPQAmHTkuLgBOAEY5OSiAZhkVdQQNBOjjUwxsPEISDwYAVQA1chZmABFybwl-URKgxASuHX1O2K4FTtS5JOU1TQiFCIN8kDMiy2J7WyryCoovXmbhVvFfYITU7r0ZQ+GUuV0tOMzNIa4ZuYsSvQBJZFbUABtMWGKiYiavhagT2mhkERkei0BziMhOWhkOgiiTkNwQWgmxwScN0QwUugiD0KTyIr3e+C+Pz+JA4CR8gm2INAwQ0qVSCgMcQmCS5cjZQx0aMmWj00ViES4Eq4MgUXKJ5mpZI+31+Cw4EXpfkZbVB2TZHLkXIGvP5FzRMpFchOETk3Wtsq08vmzzeyqpatSmuBOuZtzCkTiClSNvxQzipzREQReml4cSUQUYVyMidJOQSopKupAJkXu1u19etCMbiui5WllMkDcLRGhkIoS2ISFYizdCOjiyWMJlmBAgcAkj2pWwCPqkmitCWO4frMi40IrulrJ30MT6YRiFwxKZ7Q8sensBAArugwKgj7gAJfwIH55DtBBcSNz1OKhgAIyIyDAAFswMhcBvBlRwLcdH3NVtpl3YlFQ8c9TxwAAnfsRx2e9dSfMYEDCVJX33UhL0+MAAGMAAtUEQmBEIAAiI2BqOQY9T3PK8gK1ED0MLTCsh0aMjGghV91dTN3THb1QJZKtUmndIEXnZt8VCNEMUiK0dDnOJQgxHRG27QwgA */
    context: {},

    predictableActionArguments: true,

    on: {
      TELECHARGER: {
        target: '.Télecharger les nouveautés',
        internal: false,
      },

      ABONNEMENTS: {
        target: '.Abonnements',
        internal: false,
      },

      SAUVEGARDE: {
        target: '.Sauvegarde',
        internal: false,
      },

      NOUVEAUTES: {
        target: '.Nouveautés',
        internal: false,
      },
    },

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

      Initialisation: {
        always: [
          {
            target: 'Télecharger les nouveautés',
            cond: {
              type: 'urlInclude',
              url: '/feeds/fetching',
            },
          },
          {
            target: 'Sauvegarde',
            cond: {
              type: 'urlInclude',
              url: '/backup',
            },
          },
          {
            target: 'Abonnements',
            cond: {
              type: 'urlInclude',
              url: '/feeds',
            },
          },
          {
            target: 'Nouveautés',
            cond: {
              type: 'urlInclude',
              url: '/news',
            },
          },
          'Nouveautés',
        ],
      },
    },

    id: 'navigation',
    initial: 'Initialisation',
  })

export default machine
