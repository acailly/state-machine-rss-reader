import { createMachine } from 'xstate'

import { Context, Event, Typestate } from '../machine.types'

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QDsD2BXAbmAhugLnAHQAyAlrIQAQRxVpa4ECXsAxALI4BOAjumG5V0yMPQzY8+ZlQDGqALYKxAGwEBtAAwBdRKAAOqWGXxlUyPSAAeiAMwAOAIxEA7E4Bsjx7dsBWACy+ngA0IACeiL4AnERRcVEuAEz+Li7umo6+Lv4AvjmhDJIExOSUYrSw4oxSrJw8-ILCyFQ4AEbmosrI+HKKylRqWrpIIIbGpuaWNgj+PkSOUQ6Zmj6Jmi5RoREIALRe9kT2tlGJmVGacRkOeQUSTISwRACC3LIAFmSYODA0AOQiYkK92YbAg5jARDIyEwqAA1hCgVJiC93p9vuV-qIqkVpAgoTDZDgJsghkNLGMTGYLCNpo4Vod3Il3PZfPZEtF7ItbFtEGciCl-FFfMKXLYFppNIkbiBEcVHiiPl8fhBMYC7jU2IJuKhuER9CoiQAzHUKIiyh7PV6K9F-AHY4F46GoQnE0k6clGSmTGmIHZHIjJNzM2yadKS2zuHkIEP+IgBWyJRJRfyafxpzLS83Iq1o5VifAYB4DOjm1i25ptDpgLr4UHgyFO+Fm9Vyy2opXlfOFugqEst6SVFUiFrtZCdMDdR0EolUt3DAye4lTOyaVyMjZORz+ZlHWwuKN7ZJEdw+Tn+ez2dLsiOZ-vZ9s22hUAty4uVUuDzEjqs1zXcbW6vqRoms21Stgquads+3aVL2779mWQ4VqO46TvizozuYc4euMVLLrsiQuM4iR7hGswpu4LhBP4B6JjEu6ckmWTbpKUq3hUlhZo8pTUBU9o1PAIwUkuPoIJoUbJLeYEWhBHblmq0nMDhXrUqA0z+Kchz2BsqaOGkvjHJovgSWK8wJo4nKXk4yZpFJOL3taebQa+cH8Swn7DpWY7VhO+DKSJal2ERAbaScKzad4iaRuEvrJL4RChqkiwpIR7iCmxtzSXA-l4aJOxijEJGimltgUVRaUHj4saJRsIbuCcKSOHkeRAA */
  createMachine<Context, Event, Typestate>({
    context: {},
    predictableActionArguments: true,
    initial: 'Liste des nouveautés',
    states: {
      'Liste des nouveautés': {
        entry: 'afficherPageNouveautes',
        on: {
          'Marquer une nouveauté comme lue': {
            target: "Archivage d'une nouveauté",
            actions: 'contexteArticle',
          },
          'Marquer un abonnement comme lu': {
            target: "Archivage de toutes les nouveautés d'un abonnement",
            actions: 'contexteAbonnement',
          },
        },
      },
      "Archivage d'une nouveauté": {
        invoke: {
          src: 'archiverNouveauté',
          onDone: [
            {
              target: 'Liste des nouveautés',
              actions: 'messageNouveautéArchivée',
            },
          ],
          onError: [
            {
              target: 'Liste des nouveautés',
              actions: 'messageArchivageNouveautéEchoué',
            },
          ],
        },
      },
      "Archivage de toutes les nouveautés d'un abonnement": {
        invoke: {
          src: 'archiverNouveautésDUnAbonnement',
          onDone: [
            {
              target: 'Liste des nouveautés',
              actions: 'messageNouveautésArchivées',
            },
          ],
          onError: [
            {
              target: 'Liste des nouveautés',
              actions: 'messageArchivageAbonnementEchoué',
            },
          ],
        },
      },
    },
    id: 'nouveautes',
  })

export default machine
