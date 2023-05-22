import { EventType } from '../machine.types'

const events: Partial<Record<EventType, () => void>> = {
  'Marquer une nouveauté comme lue': () => {
    cy.get('.chakra-accordion h2').first().click()
    cy.get('button').contains('Lu').click()
  },
  'Marquer un abonnement comme lu': () => {
    cy.get('.chakra-accordion h2').first().click()
    cy.contains('Marquer tout comme lu').click()
  },
}

export default events
