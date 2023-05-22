const testStates = {
  'Liste des nouveautés': () => {
    cy.get('h2').contains('Nouveautés').should('be.visible')
  },
  "Archivage d'une nouveauté": () => {
    cy.contains('Article archivé').should('be.visible')
  },
  "Archivage de toutes les nouveautés d'un abonnement": () => {
    cy.contains('Articles archivés').should('be.visible')
  },
}

export default testStates
