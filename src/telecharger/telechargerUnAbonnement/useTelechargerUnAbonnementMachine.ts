import { AnyStateMachine } from 'xstate'

import useAllMachineConfig from '../../allMachines/useAllMachineConfig'

import machine from './telechargerUnAbonnement.machine'
import useTelechargerUnAbonnementMachineActions from './useTelechargerUnAbonnementMachineActions'
import useTelechargerUnAbonnementMachineServices from './useTelechargerUnAbonnementMachineServices'

const useTelechargerUnAbonnementMachine = (): AnyStateMachine => {
  const allMachineConfig = useAllMachineConfig()

  const actions = useTelechargerUnAbonnementMachineActions()
  const services = useTelechargerUnAbonnementMachineServices()

  return machine.withConfig(allMachineConfig).withConfig({ actions, services })
}

export default useTelechargerUnAbonnementMachine
