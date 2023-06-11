import isAfter from 'date-fns/isAfter'

import { db } from '../../db'
import { Feed } from '../../types'

const purgeFeed = async (feed: Feed) => {
  const feedMeta = await db.feedMetas.get({
    feedKey: feed.key,
  })

  if (!feedMeta) {
    await db.feedMetas.add({
      feedKey: feed.key,
      purgeThreshold: null,
    })
  }

  const feedNewsItemsFromOldToNew = await db.newsItems.where({ feedKey: feed.key }).sortBy('timestamp')

  let updatedPurgeThreshold = feedMeta?.purgeThreshold
  const newsItemsToPurgeUrls: string[] = []
  for (const feedNewsItem of feedNewsItemsFromOldToNew) {
    if (
      feedNewsItem.timestamp &&
      (!updatedPurgeThreshold || (feedNewsItem.timestamp && isAfter(feedNewsItem.timestamp, updatedPurgeThreshold)))
    ) {
      updatedPurgeThreshold = feedNewsItem.timestamp
    }

    if (feedNewsItem.read && feedNewsItem.url) {
      newsItemsToPurgeUrls.push(feedNewsItem.url)
    } else {
      break
    }
  }

  await db.feedMetas
    .where({
      feedKey: feed.key,
    })
    .modify({ purgeThreshold: updatedPurgeThreshold })

  await db.newsItems
    .where({
      feedKey: feed.key,
    })
    .and((newsItem) => !!newsItem.url && newsItemsToPurgeUrls.includes(newsItem.url))
    .delete()

  return
}

export default purgeFeed
