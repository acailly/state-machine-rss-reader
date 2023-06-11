import { AnyStateMachine } from 'xstate'

import useAllMachineConfig from '../allMachines/useAllMachineConfig'

import machine from './nouveautes.machine'
import useNouveautesMachineActions from './useNouveautesMachineActions'
import useNouveautesMachineServices from './useNouveautesMachineServices'

const useNouveautesMachine = (): AnyStateMachine => {
  const allMachineConfig = useAllMachineConfig()

  const actions = useNouveautesMachineActions()
  const services = useNouveautesMachineServices()

  return machine.withConfig(allMachineConfig).withConfig({ actions, services })
}

export default useNouveautesMachine
