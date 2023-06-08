import { createMachine } from 'xstate'

import { Context, Event, Typestate } from '../machine.types'

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEMBGB7AdpsBbMmALrAHQAyAlrIWAAQRy1pY75GwDEAygK4AOfAE4V8g2j0xMM2PAUIBtAAwBdRKD7pYFQhSxqQAD0QBaAEwAOAKwkAjIoDMAThs3zpy4psB2AGwAaEABPRFNTEnsvRyjzTx9THx8vNwBfZIDmGTZicioaekYM1jlOAEEAK3QeGjEJKRZZIiVVJBANLR09FqMEF3sSRSt7RUUfABZ3eKiA4J7zHxJLSx8IsctTLxHfVPTpIvYSAGEAC3QKA3oeWkxKgDcwABs6zLkOEt2GwloAJS4uJv02tpdJh9N1RvZzCQEpZ7D5HElFjYpkFEPZRopwqNEjZRpZ0a44dsQIUPqRjqdzhBLtceHdHiSsq93llaAAVADu2mq-xagI6IK6iC8kX6a3MjkUli8ENGXks00QWL6o1xjnM6tGjhhI1GRIZxRIADlbg8nntPj8uBwAGrIe4UCDIfm0ABm9x450tPPUmiBnVA3Ts1mxlhs8RhjhV9gVCClfUWpgiEVG5m84r1zINxtppv1RG+vw4XzAhEqYgAB7R7sgq7k6AxYGbSd7Wr7+aCTDYpSR4WrNZ4cTjHDGVY5+jZ7EifIokhqbBn6llSNm6U2WRyuWBBDa7Q6ncDXe7zhvCNyVAC28CO7HHH1zBs1Uj4mjUzGohiX9qkcNLPCF899hXXNM3zE9qiLEsy1oStq1rah6wKEDiBbPkr0FBBjBfcIXDGOVVhicwYylaw1QiRMpR8PEJ3-c1SF4ARBDgLQsHoAByWo80IDgICwMASAoTAbnQABrPjOLo-ghCYg8IHYyROIQAShIAY33LAmhQy9-UMEwli8EhpVCRJFHcXE5RjYwJwWGEvFGJElnhYZKJo0kSHoqTYGYyRZI4pCOC3QR0EEEg+GrQgXSC3ASHEtzJMYzyZLktc5EUwT0FU-kNPPXktIFAMTHMewwlssZwUUXEHJjYUSHGVw01CJx1UsFyl0OQQAEu1O8pLOILK0eJwfi0tE6KkLJDqurY3zFzkPrUpUrqsuaH12jQ-LYwScJ7ATIr0ViYcUQQRJrEUW8vBcRYZ0cFqDQOCbnR8+SkL6-zBEC4LQqdCLBCimK7s6h6euey15vSxaVE01btO6CIMXFBITI8CU0SIyxIV-RxsQu+wipu-Z-smx7ktAzlTy3bjeKGoSRr++7EumgDPjArdQYy4ElovKG8p0hBon6CF4kiUxcXGQjDrsSN+jVXwipWKUvDx7ICcBhnzTZUnwICoKQrC77frGtqAfpp6ZpJzdBFZ8HlEhv1ue6VMwjRidHGFrx1lnN8ogWOFIwnHxxXMOzFdIABJTAgV3WAuo4G323Q4w8WsJJJSRCW0TWIihlsaUTPRRJZXsYOSDDiP7Sj-kY5sZbWy568u30twsXFNVwyWaNxdhSFNXGTw0dsyIi5LnRI+j+RTGr1DocQCcRhquF3HFPFJ0SGNTFO8I3FszwccjacFbSYkDaHigR4r+R7An3K65xyEZ3GHwXHGRz25mUwbC2tETNOjYnFM1ID+uA2fQ4lOa22vMYdUGISpRnKosOEFkkRjhcDYB+KYwxomcIXA+MVKDwXyI2EBOVa7x3DCQQqOErASn9hncW8JbAeE8CqSiDhMbNWwQbckZwLhXBNPSJCoC47rTsqMBYqYXDDHBLLGMXYxyUSsF2VwaMZxuyLkBPhpsLS-AEWtHmE4RGTixM4QqxiYQv0VMLHsE437hmFBKLUqjeHEyZhrLc2ip6xjxAsT+-tcSwgUTGOYYRXZSjcDCKx112EaIkgxaSLEiacTcXbEwpgvapzzmsYYTgVQIJcFCHC5Uoh2SdvvHYUTDaEyBhovqiTr4iPBKEH86pH6USqpOEgFg7BWGhHCQORdlbGycerc2NT0LTnmGRJwwxnApNhNIuqZCpQzJcJjRIphB7h2HmXLqIz1rGGlLIqI8JcRf0iKMGMfj+huzxImShD8xj-2SEAA */
  createMachine<Context, Event, Typestate>({
    context: {},
    predictableActionArguments: true,
    initial: "Initialisation",
    states: {
      'Liste des abonnements': {
        description: 'Test description',
        entry: 'afficherPageListeAbonnements',
        on: {
          'Supprimer un abonnement': {
            target: "Suppression d'un abonnement",
            actions: 'contexteAbonnement',
          },
          'Ajouter un abonnement': {
            target: 'Choix du nouvel abonnement',
          },
        },
      },

      'Choix du nouvel abonnement': {
        entry: 'afficherPageNouvelAbonnement',
        on: {
          'Abonnement RSS': {
            target: 'Nouvel abonnement RSS',
          },
          'Abonnement Twitter': {
            target: 'Nouvel abonnement Twitter',
          },
        },
      },

      'Nouvel abonnement RSS': {
        entry: 'afficherPageNouvelAbonnementRSS',
        on: {
          'Validation flux RSS': {
            target: "Création d'un abonnement RSS",
            actions: 'contexteAbonnement',
          },
          'Retour à la liste des abonnements': {
            target: 'Liste des abonnements',
          },
        },
      },

      'Nouvel abonnement Twitter': {
        entry: 'afficherPageNouvelAbonnementTwitter',
        on: {
          'Validation flux Twitter': {
            target: "Création d'un abonnement Twitter",
            actions: 'contexteAbonnement',
          },
          'Retour à la liste des abonnements': {
            target: 'Liste des abonnements',
          },
        },
      },

      "Suppression d'un abonnement": {
        invoke: {
          src: 'supprimerAbonnement',
          onDone: [
            {
              target: 'Liste des abonnements',
              actions: 'messageAbonnementSupprimé',
            },
          ],
          onError: [
            {
              target: 'Liste des abonnements',
              actions: 'messageSuppressionAbonnementEchoué',
            },
          ],
        },
      },

      "Création d'un abonnement RSS": {
        invoke: {
          src: 'créerAbonnement',
          onDone: [
            {
              target: 'Nouvel abonnement RSS',
              actions: ['messageAbonnementCréé', 'viderFormulaireAbonnement'],
            },
          ],
          onError: [
            {
              target: 'Nouvel abonnement RSS',
              actions: 'messageCréationAbonnementEchoué',
            },
          ],
        },
      },

      "Création d'un abonnement Twitter": {
        invoke: {
          src: 'créerAbonnement',
          onDone: [
            {
              target: 'Nouvel abonnement Twitter',
              actions: ['messageAbonnementCréé', 'viderFormulaireAbonnement'],
            },
          ],
          onError: [
            {
              target: 'Nouvel abonnement Twitter',
              actions: 'messageCréationAbonnementEchoué',
            },
          ],
        },
      },

      Initialisation: {
        always: [
          {
            target: "Nouvel abonnement RSS",
            cond: {
              type: 'urlInclude',
              url: '/feeds/new/rss'
            }
          },
          {
            target: "Nouvel abonnement Twitter",
            cond: {
              type: 'urlInclude',
              url: '/feeds/new/twitter'
            }
          },
          {
          target: "Choix du nouvel abonnement",
          cond: {
            type: 'urlInclude',
            url: '/feeds/new'
          }
        }, "Liste des abonnements"]
      }
    },
    id: 'abonnements',
  })

export default machine
