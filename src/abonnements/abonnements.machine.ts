import { createMachine } from 'xstate'

import { Context, Event, Typestate } from '../machine.types'

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEMBGB7AdpsBbMmALrAHQAyAlrIWAAQRy1pY75GwDEAygK4AOfAE4V8g2j0xMM2PAUIBtAAwBdRKD7pYFQhSxqQAD0QBaAEwAOAKwkAjIoDMAThs3zpy4psB2AGwAaEABPRFNTEnsvRyjzTx9THx8vNwBfZIDmGTZicioaekYM1jlOAEEAK3QeGjEJKRZZIiVVJBANLR09FqMEOx8SRUd7cxsAFgifR2H7GwDgnocSRwmfcwSRxUtLK1T06SL2EgBhAAt0CgN6HlpMSoA3MAAbOsy5DhK9hsJaACUuLib9G1tLpMPpumMbCREkNzPZLDYol4RqZZiFLF4SL5FIpTCMvBYHKsdiBCp9SCczhcIFcbjx7k9SVk3h8srQACoAd201QBLSBHVBXUQXnx-R8o0UY0UsM8jlRCCGihIVkcpiiDi8Q1xxMZxRIADk7o9nvsvr8uBwAGrIB4UCDIAW0ABmDx4F3NvPUmmBnVA3UmUJiOJ8MKcq3s8pGjiVS0sKyc9h8DkUPh1LL1hrpxt1RB+fw43zAhEqYgAB7QHsgK7k6AxYCayZ7Wt6BWCTDYfCNFl4bPY4aZfEsU-LE31kT4PHEEprLI40-UsqRM-SG6zOdywIIrTa7Q6Qc7XRd14QeSpAS2QW2EHHHCQoytPPiRknE-LoxjR15LCMo6MO155xeA5l2zdNc2PaoCyLEtaHLStq2oWsCjA4gm35S8hQQYw4WsewHF7IY8JseJLEjQZwkcLwHHGMZBgcQDTVIXgBEEOAtCwegAHJahzQgOAgLAwBIChMFudAAGshN4pj+CENj9wgbjJF4hARLEgBjPcsCaNCL19QwTDjDFNVCRIcW-dFSKCdt7BITYIhGBEbyolNLAYskSGYuTYHYyRFJ4lCOE3QR0EEEg+ErQgnVC3ASGkzzZNYnyFKU1c5FU0T0E0gUdLPPk9MFP0TFhMIkU7KURk2CZ5RFO9TFcbw3FMMNtjSEkUPJQQAEutL81LeLzC0BJwYTMskuKOqObreq4gKFzkQaMo03rcuaL12gworr1ncIfwcCYkTxYj5VnMIPCo+rNVWRyALa+LDmmx1-OUlDBqCwQQrCiKHWiwRYvux6UrmoCzT+JaspWlRdI2-TukTWzo3hDtcXsEZzFhSNfH6YjJl7fDYVu3Z5oOB6eqe-rXogzd+ME0axPGgGyaBl7ia+KnBHB7KQVW88YcKgyECiSFJUSYYJ3MREZms+YXDs4jFE1ZFNgGVM7sm0mZuetLwK5E9qeC0Lwsi37-vVwGOK1gb2c5yHlGhn1+e6GJrC2dU4gV5r7BRaXnD6SYvfhKrYVnVI2puOt9HiyhEPyetpN5h2rzMUUmonNG42agZ5RcLs4z7XEJwsZwRncxcjlOc5LmuI0GRQhPW0w9YMVduIIhFduI2l2qFdcdwIkTWdn1LjMa+10GuHrzaBeIj9mtMDZ0QsJxOxHZFwhI0JzEqzsB2H4DR6t3Xqkn2HEG-ZulbcVwYgmEYasiKEk3Rrf1kmIe1dZmSWPki2KdZk-HYmDVLeBEEpC7YicD+eUxgXCQnFB2SUURHJbG8HvbIGtybA1NINABV4Z53ibqML27hqrS07OYKEjhaJbEsDhTwaDOpM1-lgz47Ij6blwZhIymIvxLFAeYTUmps52DCPtHEo5nYlw-iDeA+U+ZJ3RkqMqP48KVRvNA+eSp4FJnRM4NUg9Q7JCAA */
  createMachine<Context, Event, Typestate>({
    context: {},
    predictableActionArguments: true,
    initial: 'Liste des abonnements',
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
    },
    id: 'abonnements',
  })

export default machine
