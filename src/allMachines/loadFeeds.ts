import { db } from '../db'
import { Feed } from '../types'

const loadFeeds = async (newFeeds: Feed[]) => {
  await db.feedMetas.clear()
  await db.feeds.clear()
  await db.newsItems.clear()

  for (const feed of newFeeds) {
    await db.feeds.add(feed)
  }
}

export default loadFeeds
