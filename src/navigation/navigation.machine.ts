import { createMachine } from 'xstate'

import { Context, Event, Typestate } from '../machine.types'

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QDsCGA3AllVAXTA9sgMQAqAogDLkDCAEgIIBKA4uUwNoAMAuoqAAcCsTPiL8QAT0QBaABwB2AHQBWADQgAHogAsKgGwBfQxrRYcYkgwBCAeQBy98gFly90gGVufJCCEjLCWkEGQBGBXUtRAV9LiUAJgiuLgBOUJUVRIBmHWNTDGw8QhIPBgBVADVyFmYAEXJvCX9RYqDZeP141Q1tBFCuBWV+5K59fqyVdKMTEDNCy2J7W0rycoovXibhFvFfYJkJrh7EUKzBpR0zycyVRTkUvNmCi2KlAElkFtQAG0xYIqIxEavmagV8vQyShiWRyoy4oT0OhScki+1CXTkcn02IUOn0KQmWXh0xmyAIEDgEjmL12gm2YNAvRkOjkGn2l2UKhGqXCHUUiUe1IByCU9gIAFd0GBUOLcABL+Ag+mtcGII5SRDxHRcQXPYVKBgAIyIyDAAFswMhcIq6QEVYy1WzdPFQqpdeZ9R4ZVKcAAnClbO20qIIdXBWJZd3zV6kOXfMAAYwAFqhfTBfQACeOwDNkyXS2UKwM7ZASXph6JyHRu0l6yzvT74H5-YXFhkhrIpKFV0LDFJjLL3fROkKhftKLhyDrolJceI5FQKKM0kW4OD4ZAJ77ikTB0H2kC4AgCWRE11Y+I9rgTS5yAYaeMAM1wmv0KiU+kJi8Svan8Q0xq4EeZrtCoWRKBeV43oO94gL62BJi+CCDu+n5gd+Ci-vE-4gAA7pgEC4EmJzxOqSZgAhSEsscCAdKhX4KD+oR-iOBzwhBnRQSot4DMYxhAA */
  createMachine<Context, Event, Typestate>({
    /** @xstate-layout N4IgpgJg5mDOIC5QDsCGA3AllVAXTA9sgMQAqAogDLkDCAEgIIBKA4uUwNoAMAuoqAAcCsTPiL8QAD0QAWAKwA2ADQgAnogC0ADgDsAOjkBfQyrRYcYkgwBCAeQBy98gFly90gGVufJCCEjLCWkEHQUuPQAmHTkuLgBOAEY5OSiAZhkVdQQNBOjjUwxsPEISDwYAVQA1chZmABFybwl-URKgxASuHX1O2K4FTtS5JOU1TQiFCIN8kDMiy2J7WyryCoovXmbhVvFfYITU7r0ZQ+GUuV0tOMzNIa4ZuYsSvQBJZFbUABtMWGKiYiavhagT2txkMkiEQOqQUMjiMN0yRuCDiEJhcNycUUqNSUQehSeRFe73wXx+fxIHASPkE2xBoGCGhh4QicQUuMUWiG8OiyIiQz0Wi0sK0EXiMlCXKMJlmBIpxI+31+Cw4ERpfjpbVB2WZkTZHIUUp5cmRJxZEQt3R0h3SOi0Mnx5nlb0V5JVqXVwK1DNuYT17JkXTkga44OROgSCkiMgUqO6Mn5kelBSdlgVpKVFIBMk9mt2PuyCjk+lSou6QuScR0GTG2S0cmjcSbV10Clj9uMMuQBAgcAkjwpWwC3qkmh0XAbpaidvrcirNayGhO+hifTCMQuoodXblafsBAArugwKgD7gAJfwIF55DtBBcPmBx3zZ4MABGRGQYAAtmBkLgr1pYd81He9TShaYd1TZ4PFPY8cAAJ17IcdlvbUH1rMJUmfQlkD0Uhz0+MAAGMAAtUAQmAEIAAiI2BqO7I8TzPS8UPpUCMKyO0IWTWVoKJF0MzdEcvRAxk4VSY54Rke0uC0BJhVbZFRUiYNq3iSUogSBJO0MIA */
    context: {},

    predictableActionArguments: true,

    on: {
      TELECHARGER: {
        target: '.Télecharger les nouveautés',
        internal: false
      },

      ABONNEMENTS: {
        target: '.Abonnements',
        internal: false,
      },

      SAUVEGARDE: {
        target: '.Sauvegarde',
        internal: false
      },

      NOUVEAUTES: {
        target: '.Nouveautés',
        internal: false
      }
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
        always: [{
          target: "Nouveautés",
          cond: {
            type: 'urlInclude',
            url: '/news'
          }
        }, {
          target: "Abonnements",
          cond: {
            type: 'urlInclude',
            url: '/feeds'
          }
        }, {
          target: "Sauvegarde",
          cond: {
            type: 'urlInclude',
            url: '/backup'
          }
        }, {
          target: "Télecharger les nouveautés",
          cond: {
            type: 'urlInclude',
            url: '/feeds/fetching'
          }
        },
        "Nouveautés"]
      }
    },

    id: 'navigation',
    initial: "Initialisation"
  })

export default machine
