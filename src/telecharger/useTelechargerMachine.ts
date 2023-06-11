import { AnyStateMachine } from 'xstate'

import useAllMachineConfig from '../allMachines/useAllMachineConfig'

import machine from './telecharger.machine'
import useTelechargerMachineActions from './useTelechargerMachineActions'
import useTelechargerMachineServices from './useTelechargerMachineServices'

const useTelechargerMachine = (): AnyStateMachine => {
  const allMachineConfig = useAllMachineConfig()

  const actions = useTelechargerMachineActions()
  const services = useTelechargerMachineServices()

  return machine.withConfig(allMachineConfig).withConfig({ actions, services })
}

export default useTelechargerMachine
