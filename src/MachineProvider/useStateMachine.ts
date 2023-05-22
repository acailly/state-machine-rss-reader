import { useActor, useSelector } from '@xstate/react'
import { useContext } from 'react'
import { State } from 'xstate'

import { Context, Event, SubMachineName, Typestate } from '../machine.types'

import { MachineContext } from './MachineProvider'

const useStateMachine = (childStateMachineName?: SubMachineName) => {
  const { interpretedStateMachine } = useContext(MachineContext)
  const [state] = useActor(interpretedStateMachine)

  const targetActor = childStateMachineName
    ? state.children[childStateMachineName] ?? interpretedStateMachine
    : interpretedStateMachine
  const targetSend = targetActor?.send
  const targetState: State<Context, Event, never, Typestate> = useSelector(targetActor, (state) => state)

  return { state: targetState, send: targetSend }
}

export default useStateMachine
