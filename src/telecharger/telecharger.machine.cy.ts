import { createModel } from '@xstate/test'

import addTests from '../stateMachineTools/addTests'

import machine from './telecharger.machine'
import testEvents from './telecharger.machine.cypress-events'
import testStates from './telecharger.machine.cypress-states'

const testMachine = addTests(machine, testStates)
const testModel = createModel(testMachine).withEvents(testEvents)

describe('telecharger', () => {
  beforeEach(function () {
    cy.intercept('GET', 'https://acailly-cors-anywhere.onrender.com/https://reactjs.org/feed.xml', (req) => {
      req.reply({ body: 'success', delay: 1000 })
    })
    cy.intercept('GET', 'https://acailly-cors-anywhere.onrender.com/https://blog.angular.io/feed', (req) => {
      req.reply({ body: 'success', delay: 1000 })
    })
    cy.intercept('GET', 'https://acailly-cors-anywhere.onrender.com/https://blog.vuejs.org/feed.rss', (req) => {
      req.reply({ body: 'success', delay: 1000 })
    })
    cy.visit('http://localhost:3000/feeds/fetching')
    cy.contains('Charger les données fictives').click()
    cy.reload()
  })

  const testPlans = testModel.getSimplePathPlans()
  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        it(path.description, () => {
          cy.then(path.test)
        })
      })
    })
  })
  describe('coverage', () => {
    it('should pass', () => {
      testModel.testCoverage()
    })
  })
})
