import { AnyStateMachine } from 'xstate'

import useAllMachineConfig from '../allMachines/useAllMachineConfig'

import machine from './navigation.machine'
import useNavigationMachineServices from './useNavigationMachineServices'

const useNavigationMachine = (): AnyStateMachine => {
  const allMachineConfig = useAllMachineConfig()

  const services = useNavigationMachineServices()

  return machine.withConfig(allMachineConfig).withConfig({ services })
}

export default useNavigationMachine
