const testStates = {
  'Récupération des abonnements': () => {
    cy.contains('Blog React').should('be.visible')
    cy.contains('Blog Angular').should('be.visible')
    cy.contains('Blog Vue').should('be.visible')
  },
  'En cours de téléchargement': () => {
    cy.get('[aria-label="téléchargement en cours"]').should('be.visible')
  },
}

export default testStates
