import { useMemo } from 'react'

import { Context, Services } from '../../machine.types'

import addNewsItems from './addNewsItems'
import fetchFeed from './fetchFeed'
import purgeFeed from './purgeFeed'

const useTelechargerUnAbonnementMachineServices = () => {
  const services: Services = useMemo(() => {
    return {
      téléchargerAbonnement: (context: Context) => {
        const { abonnement } = context
        if (!abonnement) {
          return Promise.reject()
        }

        return fetchFeed(abonnement).then(async (articles) => {
          await addNewsItems(articles)
          await purgeFeed(abonnement)
        })
      },
    }
  }, [])

  return services
}

export default useTelechargerUnAbonnementMachineServices
