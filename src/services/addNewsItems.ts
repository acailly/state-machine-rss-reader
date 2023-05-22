import isAfter from 'date-fns/isAfter'

import { db } from '../db'
import { NewsItem } from '../types'

const addNewsItem = async (newsItemToAdd: NewsItem) => {
  if (!newsItemToAdd.url || !newsItemToAdd.feedKey) {
    return
  }

  const alreadyExistingNewsItem = await db.newsItems.get({
    url: newsItemToAdd.url,
    feedKey: newsItemToAdd.feedKey,
  })

  if (!alreadyExistingNewsItem) {
    const feedMeta = await db.feedMetas.get({
      feedKey: newsItemToAdd.feedKey,
    })

    const shouldBePurged =
      feedMeta?.purgeThreshold && newsItemToAdd.timestamp && !isAfter(newsItemToAdd.timestamp, feedMeta?.purgeThreshold)

    if (!shouldBePurged) {
      await db.newsItems.add(newsItemToAdd)
    }
  }
}

const addNewsItems = async (newsItemsToAdd: NewsItem[]) => {
  await Promise.all(newsItemsToAdd.map(addNewsItem))
}

export default addNewsItems
