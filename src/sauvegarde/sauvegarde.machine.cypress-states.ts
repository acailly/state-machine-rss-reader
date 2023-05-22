const testStates = {
  'Choix du type de sauvegarde': () => {
    cy.get('h2').contains('Sauvegarde').should('be.visible')
  },
}

export default testStates
