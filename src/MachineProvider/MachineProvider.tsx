import { useInterpret } from '@xstate/react'
import { createContext, PropsWithChildren, useEffect } from 'react'
import { InterpreterFrom } from 'xstate'

import useNavigationMachine from '../navigation/useNavigationMachine'
import debugStateMachine from '../stateMachineTools/debugStateMachine'

interface MachineContextContextInterface {
  interpretedStateMachine: InterpreterFrom<ReturnType<typeof useNavigationMachine>>
}

export const MachineContext = createContext<MachineContextContextInterface>({} as MachineContextContextInterface)

export const MachineProvider = (props: PropsWithChildren) => {
  const navigation = useNavigationMachine()
  const interpretedStateMachine = useInterpret(navigation, { devTools: true })

  useEffect(() => {
    debugStateMachine(interpretedStateMachine)
  }, [interpretedStateMachine])

  return <MachineContext.Provider value={{ interpretedStateMachine }}>{props.children}</MachineContext.Provider>
}
