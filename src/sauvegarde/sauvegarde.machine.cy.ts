import { createModel } from '@xstate/test'

import addTests from '../stateMachineTools/addTests'

import machine from './sauvegarde.machine'
import testEvents from './sauvegarde.machine.cypress-events'
import testStates from './sauvegarde.machine.cypress-states'

const testMachine = addTests(machine, testStates)
const testModel = createModel(testMachine).withEvents(testEvents)

describe('sauvegarde', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000/backup')
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
