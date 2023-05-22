import { useMemo } from 'react'

import { db } from '../db'
import { Context, Services } from '../machine.types'
import addNewsItems from '../services/addNewsItems'
import fetchFeed from '../services/fetchFeed'
import purgeFeed from '../services/purgeFeed'

const useMachineServices = () => {
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
      récupérerListeAbonnements: () => {
        return db.feeds.toArray()
      },
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

export default useMachineServices
