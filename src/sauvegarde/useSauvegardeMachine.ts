import { AnyStateMachine } from 'xstate'

import useAllMachineConfig from '../allMachines/useAllMachineConfig'

import machine from './sauvegarde.machine'
import useSauvegardeMachineActions from './useSauvegardeMachineActions'

const useSauvegardeMachine = (): AnyStateMachine => {
  const allMachineConfig = useAllMachineConfig()

  const actions = useSauvegardeMachineActions()

  return machine.withConfig(allMachineConfig).withConfig({ actions })
}

export default useSauvegardeMachine
