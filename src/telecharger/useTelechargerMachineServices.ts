import { useMemo } from 'react'

import { db } from '../db'
import { Services } from '../machine.types'

const useTelechargerMachineServices = () => {
  const services: Services = useMemo(() => {
    return {
      récupérerListeAbonnements: () => {
        return db.feeds.toArray()
      },
    }
  }, [])

  return services
}

export default useTelechargerMachineServices
