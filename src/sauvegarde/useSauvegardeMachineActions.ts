import { useMemo } from 'react'

import useAbsoluteNavigate from '../MachineProvider/useAbsoluteNavigate'
import baseUrl from '../allMachines/baseUrl'
import { Actions } from '../machine.types'

const useSauvegardeMachineActions = () => {
  const navigate = useAbsoluteNavigate()

  const actions: Actions = useMemo(() => {
    return {
      afficherPageSauvegarde: () => {
        navigate(`${baseUrl}backup`)
      },
    }
  }, [navigate])

  return actions
}

export default useSauvegardeMachineActions
