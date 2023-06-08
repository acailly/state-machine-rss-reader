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

import useMachineActions from './useMachineActions'
import useMachineGuards from './useMachineGuards'
import useMachineServices from './useMachineServices'

interface MachineContextContextInterface {
  interpretedStateMachine: InterpreterFrom<typeof appMachine>
}

export const MachineContext = createContext<MachineContextContextInterface>({} as MachineContextContextInterface)

export const MachineProvider = (props: PropsWithChildren) => {
  const actions = useMachineActions()
  const services = useMachineServices()
  const guards = useMachineGuards()

  // FIXME quand les nested states seront collapsibles, remplacer les sous machines invoquées
  // par des nested states ?
  const subMachines: Record<SubMachineName, AnyStateMachine> = useMemo(() => {
    return {
      abonnements: abonnements.withConfig({ actions, services, guards }),
      nouveautes: nouveautes.withConfig({ actions, services, guards }),
      telecharger: telecharger.withConfig({ actions, services, guards }),
      sauvegarde: sauvegarde.withConfig({ actions, services, guards }),
    }
  }, [actions, services, guards])

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
      guards,
    })
  }, [actions, guards, servicesAndSubMachines])

  const interpretedStateMachine = useInterpret(fullAppMachine, { devTools: true })

  useEffect(() => {
    debugStateMachine(interpretedStateMachine)
  }, [interpretedStateMachine])

  // INFO : ce code servait anciennement à initialiser l'état initial à partir de l'URL
  // useEffect(() => {
  //   initializeFromUrl(currentLocation, interpretedStateMachine)
  // }, [interpretedStateMachine])

  return <MachineContext.Provider value={{ interpretedStateMachine }}>{props.children}</MachineContext.Provider>
}
