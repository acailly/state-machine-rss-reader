import { Feed, NewsItem } from '../types'

import fetchRssFeed from './fetchRssFeed'
import fetchTwitterFeed from './fetchTwitterFeed'

const fetchFeed = (feed: Feed): Promise<NewsItem[]> => {
  if (feed.type === 'rss') {
    return fetchRssFeed(feed)
  }
  if (feed.type === 'twitter') {
    return fetchTwitterFeed(feed)
  }
  // @ts-expect-error unknown type
  throw new Error('Feed type is not supported: ' + feed.type)
}

export const QUERY_FETCH_FEEDS = 'feeds'

export default fetchFeed
