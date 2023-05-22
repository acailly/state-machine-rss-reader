import { createModel } from '@xstate/test'

import addTests from '../../stateMachineTools/addTests'
import { Feed } from '../../types'

import createMachineForAbonnement from './telechargerUnAbonnement.machine'
import testEvents from './telechargerUnAbonnement.machine.cypress-events'
import testStates from './telechargerUnAbonnement.machine.cypress-states'

const abonnement: Feed = {
  title: 'Blog React',
  url: 'https://reactjs.org/feed.xml',
  type: 'rss',
  key: 'rss:https://reactjs.org/feed.xml',
}
const testMachine = addTests(createMachineForAbonnement(abonnement), testStates)
const testModel = createModel(testMachine).withEvents(testEvents)

describe('telecharger un abonnement', () => {
  beforeEach(function () {
    cy.intercept('GET', 'https://acailly-cors-anywhere.onrender.com/https://reactjs.org/feed.xml', (req) => {
      req.reply({ body: 'success', delay: 1000 })
    })
    cy.intercept('GET', 'https://acailly-cors-anywhere.onrender.com/https://blog.angular.io/feed', {
      forceNetworkError: true,
    })
    cy.intercept('GET', 'https://acailly-cors-anywhere.onrender.com/https://blog.vuejs.org/feed.rss', {
      forceNetworkError: true,
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
          if (
            path.segments.some((segment) => segment.event.type.startsWith('error.platform.telechargerUnAbonnement'))
          ) {
            cy.intercept('GET', 'https://acailly-cors-anywhere.onrender.com/https://reactjs.org/feed.xml', {
              statusCode: 404,
              body: '404 Not Found!',
              headers: {
                'x-not-found': 'true',
              },
              delay: 1000,
            })
            cy.reload()
          }

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
