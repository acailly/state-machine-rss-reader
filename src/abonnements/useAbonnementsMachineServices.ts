import { useMemo } from 'react'

import { db } from '../db'
import { Context, Services } from '../machine.types'

const useAbonnementsMachineServices = () => {
  const services: Services = useMemo(() => {
    return {
      supprimerAbonnement: (context: Context) => {
        const { abonnement } = context
        if (!abonnement) {
          return Promise.reject()
        }

        return db.feeds.where('key').equals(abonnement.key).delete()
      },
      créerAbonnement: (context: Context) => {
        const { abonnement } = context
        if (!abonnement) {
          return Promise.reject()
        }

        return db.feeds.add(abonnement)
      },
    }
  }, [])

  return services
}

export default useAbonnementsMachineServices
