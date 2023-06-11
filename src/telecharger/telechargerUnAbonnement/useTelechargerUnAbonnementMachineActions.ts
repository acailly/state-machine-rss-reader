import { useMemo } from 'react'
import { assign, sendUpdate } from 'xstate'

import { Actions, Context, Event } from '../../machine.types'

const useTelechargerUnAbonnementMachineActions = () => {
  const actions: Actions = useMemo(() => {
    return {
      partageEtatCourant: sendUpdate(),
      contexteErreur: assign((context: Context, event: Event) => {
        if (event.type === 'error.platform') {
          return {
            error: event.data,
          }
        }
        return {}
      }),
    }
  }, [])

  return actions
}

export default useTelechargerUnAbonnementMachineActions
