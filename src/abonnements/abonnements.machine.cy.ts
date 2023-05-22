import { createModel } from '@xstate/test'

import addTests from '../stateMachineTools/addTests'

import machine from './abonnements.machine'
import testEvents from './abonnements.machine.cypress-events'
import testStates from './abonnements.machine.cypress-states'

const testMachine = addTests(machine, testStates)
const testModel = createModel(testMachine).withEvents(testEvents)

describe('abonnements', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000/feeds')
    cy.contains('Charger les données fictives').click()
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
