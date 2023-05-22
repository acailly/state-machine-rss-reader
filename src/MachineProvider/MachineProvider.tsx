import { useInterpret } from '@xstate/react'
import { createContext, PropsWithChildren, useEffect, useMemo } from 'react'
import { AnyStateMachine, InterpreterFrom } from 'xstate'

import abonnements from '../abonnements/abonnements.machine'
import { SubMachineName } from '../machine.types'
import appMachine from '../navigation/navigation.machine'
import nouveautes from '../nouveautes/nouveautes.machine'
import sauvegarde from '../sauvegarde/sauvegarde.machine'
import debugStateMachine from '../stateMachineTools/debugStateMachine'
import telecharger from '../telecharger/telecharger.machine'

import initializeFromUrl from './initializeFromUrl'
import useMachineActions from './useMachineActions'
import useMachineServices from './useMachineServices'

const currentLocation = window.location.pathname

interface MachineContextContextInterface {
  interpretedStateMachine: InterpreterFrom<typeof appMachine>
}

export const MachineContext = createContext<MachineContextContextInterface>({} as MachineContextContextInterface)

export const MachineProvider = (props: PropsWithChildren) => {
  const actions = useMachineActions()
  const services = useMachineServices()

  // FIXME quand les nested states seront collapsibles, remplacer les sous machines invoquées
  // par des nested states ?
  const subMachines: Record<SubMachineName, AnyStateMachine> = useMemo(() => {
    return {
      abonnements: abonnements.withConfig({ actions, services }),
      nouveautes: nouveautes.withConfig({ actions, services }),
      telecharger: telecharger.withConfig({ actions, services }),
      sauvegarde: sauvegarde.withConfig({ actions, services }),
    }
  }, [actions, services])

  const servicesAndSubMachines = useMemo(() => {
    return {
      ...services,
      ...subMachines,
    }
  }, [services, subMachines])

  const fullAppMachine = useMemo(() => {
    return appMachine.withConfig({
      actions,
      services: servicesAndSubMachines,
    })
  }, [actions, servicesAndSubMachines])

  const interpretedStateMachine = useInterpret(fullAppMachine, { devTools: true })

  useEffect(() => {
    debugStateMachine(interpretedStateMachine)
  }, [interpretedStateMachine])

  useEffect(() => {
    initializeFromUrl(currentLocation, interpretedStateMachine)
  }, [interpretedStateMachine])

  return <MachineContext.Provider value={{ interpretedStateMachine }}>{props.children}</MachineContext.Provider>
}
