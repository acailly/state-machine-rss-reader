import { useMemo } from 'react'

import useAbonnementsMachine from '../abonnements/useAbonnementsMachine'
import { Services } from '../machine.types'
import useNouveautesMachine from '../nouveautes/useNouveautesMachine'
import useSauvegardeMachine from '../sauvegarde/useSauvegardeMachine'
import useTelechargerMachine from '../telecharger/useTelechargerMachine'

const useNavigationMachineServices = () => {
  const abonnements = useAbonnementsMachine()
  const nouveautes = useNouveautesMachine()
  const telecharger = useTelechargerMachine()
  const sauvegarde = useSauvegardeMachine()

  const services: Services = useMemo(() => {
    return {
      abonnements,
      nouveautes,
      telecharger,
      sauvegarde,
    }
  }, [abonnements, nouveautes, sauvegarde, telecharger])

  return services
}

export default useNavigationMachineServices
