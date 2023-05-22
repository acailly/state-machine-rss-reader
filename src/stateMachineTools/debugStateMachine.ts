import { AnyInterpreter } from 'xstate'

const debugStateMachine = (machine: AnyInterpreter) => {
  machine
    .onChange((ctx) => {
      console.log('[CONTEXT]', ctx)
    })
    .onTransition((state) => {
      console.log('[STATE]', state.value)
    })
    .onEvent((event) => {
      console.log('[EVENT]', event.type)
    })
    .onSend((event) => {
      console.log('[SENT]', event.type)
    })
}

export default debugStateMachine
