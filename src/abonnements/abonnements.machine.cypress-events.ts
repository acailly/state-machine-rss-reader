import { EventType } from '../machine.types'

const events: Partial<Record<EventType, () => void>> = {
  'Ajouter un abonnement': () => {
    cy.contains('Ajouter un abonnement').click()
  },
  'Supprimer un abonnement': () => {
    cy.contains('Supprimer').click()
    cy.get('footer').contains('Supprimer').click()
  },
  'Abonnement RSS': () => {
    cy.contains('Ajouter un Flux RSS').click()
  },
  'Abonnement Twitter': () => {
    cy.contains('Ajouter votre timeline Twitter').click()
  },
  'Retour à la liste des abonnements': () => {
    cy.contains('Revenir à la liste des abonnements').click()
  },
  'Validation flux RSS': () => {
    cy.get('input[name="name"]').type('lorem ipsum')
    cy.get('input[name="url"]').type('https://localhost/')
    cy.contains('Ajouter ce flux RSS').click()
  },
  'Validation flux Twitter': () => {
    cy.get('input[name="name"]').type('lorem ipsum')
    cy.get('input[name="consumerKey"]').type('abc')
    cy.get('input[name="consumerSecret"]').type('abc')
    cy.get('input[name="accessTokenKey"]').type('abc')
    cy.get('input[name="accessTokenSecret"]').type('abc')
    cy.contains('Ajouter ce flux Twitter').click()
  },
}

export default events
