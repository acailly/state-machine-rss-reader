import { createModel } from '@xstate/test'

import addTests from '../stateMachineTools/addTests'

import machine from './navigation.machine'
import testEvents from './navigation.machine.cypress-events'
import testStates from './navigation.machine.cypress-states'

const testMachine = addTests(machine, testStates)
const testModel = createModel(testMachine).withEvents(testEvents)

describe('navigation', () => {
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

// FIXME comment tester les transitions depuis un parent ?
// const testPlanFromAbonnementsEvent = testModel.getPlanFromEvents([{ type: 'NOUVEAUTES' }, { type: 'ABONNEMENTS' }], {
//   target: 'Abonnements',
// })
// describe(testPlanFromAbonnementsEvent.description, () => {
//   testPlanFromAbonnementsEvent.paths.forEach((path) => {
//     it(path.description, () => {
//       return cy.visit('http://localhost:3000/').then(() => {
//         return path.test(cy)
//       })
//     })
//   })
// })

// FIXME Coverage incomplet
// describe('coverage', () => {
//   it('should pass', () => {
//     testModel.testCoverage()
//   })
// })
