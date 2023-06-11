import { useMemo } from 'react'
import { assign, spawn } from 'xstate'

import useAbsoluteNavigate from '../MachineProvider/useAbsoluteNavigate'
import baseUrl from '../allMachines/baseUrl'
import { Actions, Context, Event } from '../machine.types'

import useTelechargerUnAbonnementMachine from './telechargerUnAbonnement/useTelechargerUnAbonnementMachine'

const useTelechargerMachineActions = () => {
  const navigate = useAbsoluteNavigate()
  const telechargerUnAbonnement = useTelechargerUnAbonnementMachine()

  const actions: Actions = useMemo(() => {
    return {
      afficherPageTelechargement: () => {
        navigate(`${baseUrl}feeds/fetching`)
      },
      contexteAbonnements: assign((context: Context, event: Event) => {
        // FIXME : un peu relou d'avoir à spécifier ca directement
        if (event.type === 'done.invoke.récupérerListeAbonnements') {
          return {
            abonnements: event.data,
          }
        }
        return {}
      }),
      téléchargerNouveautés: assign((context: Context) => {
        // Inspiré par l'exemple TodoMVC : https://codesandbox.io/s/xstate-todomvc-33wr94qv1?from-embed
        return {
          téléchargements: context.abonnements?.map((abonnement) => {
            const téléchargement = {
              feedKey: abonnement.key,
              actor: spawn<Context, Event>(telechargerUnAbonnement.withContext({ abonnement })),
            }
            return téléchargement
          }),
        }
      }),
    }
  }, [navigate, telechargerUnAbonnement])

  return actions
}

export default useTelechargerMachineActions
