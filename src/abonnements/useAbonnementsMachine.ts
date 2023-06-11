import { AnyStateMachine } from 'xstate'

import useAllMachineConfig from '../allMachines/useAllMachineConfig'

import machine from './abonnements.machine'
import useAbonnementsMachineActions from './useAbonnementsMachineActions'
import useAbonnementsMachineServices from './useAbonnementsMachineServices'

const useAbonnementsMachine = (): AnyStateMachine => {
  const allMachineConfig = useAllMachineConfig()

  const actions = useAbonnementsMachineActions()
  const services = useAbonnementsMachineServices()

  return machine.withConfig(allMachineConfig).withConfig({ actions, services })
}

export default useAbonnementsMachine
