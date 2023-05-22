import { createModel } from '@xstate/test'

import addTests from '../stateMachineTools/addTests'

import machine from './nouveautes.machine'
import testEvents from './nouveautes.machine.cypress-events'
import testStates from './nouveautes.machine.cypress-states'

const testMachine = addTests(machine, testStates)
const testModel = createModel(testMachine).withEvents(testEvents)

describe('nouveautés', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000/news')
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
