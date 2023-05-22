import { Machine, StateKey, StateMeta } from '../machine.types'

// Inspired from https://timdeschryver.dev/blog/generated-tests-with-xstate-and-cypress#a-reusable-state-machine-across-tests
function addTests(machine: Machine, tests: Partial<Record<StateKey, StateMeta>>): Machine {
  const newMachine: Machine = machine.withConfig({}) // clone the machine
  Object.entries(newMachine.states).forEach(([stateKey, stateValue]) => {
    if (!(stateKey in tests)) {
      return
    }

    const stateTest = tests[stateKey as StateKey]

    stateValue.meta = {
      ...stateValue.meta,
      test: stateTest,
    }
  })
  return newMachine
}

export default addTests
