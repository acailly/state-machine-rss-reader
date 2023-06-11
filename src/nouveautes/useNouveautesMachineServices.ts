import { useMemo } from 'react'

import { db } from '../db'
import { Context, Services } from '../machine.types'

const useNouveautesMachineServices = () => {
  const services: Services = useMemo(() => {
    return {
      archiverNouveauté: (context: Context) => {
        const { article } = context
        if (!article) {
          return Promise.reject()
        }

        return db.newsItems
          .where({
            url: article.url,
            feedKey: article.feedKey,
          })
          .modify({ read: 1 })
      },
      archiverNouveautésDUnAbonnement: (context: Context) => {
        const { abonnement } = context
        if (!abonnement) {
          return Promise.reject()
        }

        return db.newsItems
          .where({
            feedKey: abonnement.key,
          })
          .modify({ read: 1 })
      },
    }
  }, [])

  return services
}

export default useNouveautesMachineServices
