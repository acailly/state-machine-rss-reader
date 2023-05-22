const testStates = {
  Nouveautés: () => {
    cy.url().should('include', '/news')
  },
  Abonnements: () => {
    cy.url().should('include', '/feeds')
  },
  Sauvegarde: () => {
    cy.url().should('include', '/backup')
  },
  'Télecharger les nouveautés': () => {
    cy.url().should('include', '/feeds/fetching')
  },
}

export default testStates
