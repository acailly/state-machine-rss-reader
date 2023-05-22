const testStates = {
  'En cours de téléchargement': () => {
    cy.contains('li', 'Blog React').within(() => {
      return cy.get('[aria-label="téléchargement en cours"]').should('be.visible')
    })
  },
  'Téléchargement réussi': () => {
    cy.contains('li', 'Blog React').within(() => {
      return cy.get('[aria-label="téléchargement réussi"]').should('be.visible')
    })
  },
  'Téléchargement échoué': () => {
    cy.contains('li', 'Blog React').within(() => {
      return cy.get('[aria-label="téléchargement échoué"]').should('be.visible')
    })
  },
}

export default testStates
