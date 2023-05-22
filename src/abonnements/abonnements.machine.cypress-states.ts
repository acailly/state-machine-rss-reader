const testStates = {
  'Liste des abonnements': () => {
    cy.get('h2').contains('Abonnements').should('be.visible')
  },
  "Suppression d'un abonnement": () => {
    cy.contains('Abonnement supprimé').should('be.visible')
  },
  'Choix du nouvel abonnement': () => {
    cy.get('h2').contains('Nouvel abonnement').should('be.visible')
  },
  'Nouvel abonnement RSS': () => {
    cy.get('h2').contains('Nouveau flux RSS').should('be.visible')
  },
  "Création d'un abonnement RSS": () => {
    cy.contains('Abonnement ajouté').should('be.visible')
  },
  'Nouvel abonnement Twitter': () => {
    cy.get('h2').contains('Nouveau flux Twitter').should('be.visible')
  },
  "Création d'un abonnement Twitter": () => {
    cy.contains('Abonnement ajouté').should('be.visible')
  },
}

export default testStates
