import { ChakraProvider } from '@chakra-ui/react'
import { inspect } from '@xstate/inspect'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { MachineProvider } from './MachineProvider'
import './index.css'
import theme from './theme'

// @ts-expect-error unknown property
if (!window.Cypress && import.meta.env.MODE === 'development') {
  inspect({
    url: 'https://stately.ai/viz?inspect', // (default)
    // url: 'https://statecharts.io/inspect',
    // url: 'http://localhost:9999/viz?inspect',
    iframe: false, // open in new window
  })
}

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <MachineProvider>
          <App />
        </MachineProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
