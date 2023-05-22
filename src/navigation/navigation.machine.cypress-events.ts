import { EventType } from '../machine.types'

const events: Partial<Record<EventType, () => void>> = {
  NOUVEAUTES: () => {
    cy.get('button').contains('Nouveautés').click()
  },
  ABONNEMENTS: () => {
    cy.get('button').contains('Abonnements').click()
  },
  SAUVEGARDE: () => {
    cy.get('button').contains('Sauvegarde').click()
  },
  TELECHARGER: () => {
    cy.get('button').contains('Télécharger les nouveautés').click()
  },
}

export default events
