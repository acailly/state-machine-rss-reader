import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // used https://medium.com/@nelfayran/cypress-react-and-vite-collaboration-bed6761808fc
      // to configure e2e code coverage
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('@cypress/code-coverage/task')(on, config)

      return config
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
  },
})
