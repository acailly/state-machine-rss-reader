import { useMemo } from 'react'

import { Guards } from '../machine.types'

const useAllMachineGuards = () => {
  const guards: Guards = useMemo(() => {
    return {
      urlInclude: (context, event, { cond }) => {
        return (
          // @ts-expect-error FIXME trouver un moyen de gérer correctement le type des guards custom
          window.location.pathname.includes(cond.url)
        )
      },
    }
  }, [])

  return guards
}

export default useAllMachineGuards
