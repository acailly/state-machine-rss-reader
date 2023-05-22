import { useCallback, useMemo } from 'react'
import { AnyStateMachine, sendUpdate } from 'xstate'

import { Actions } from '../machine.types'
import createMachineForAbonnement from '../telecharger/telechargerUnAbonnement/telechargerUnAbonnement.machine'
import { Feed } from '../types'

import useMachineServices from './useMachineServices'

const useCreateTelechargerUnAbonnementMachine = () => {
  const actions: Actions = useMemo(
    () => ({
      partageEtatCourant: sendUpdate(),
    }),
    []
  )
  const services = useMachineServices()

  const createTelechargerUnAbonnementMachine = useCallback(
    (abonnement: Feed): AnyStateMachine => {
      return createMachineForAbonnement(abonnement).withConfig({ actions, services })
    },
    [actions, services]
  )

  return { createTelechargerUnAbonnementMachine }
}

export default useCreateTelechargerUnAbonnementMachine
