export interface NewsItem {
  title: string | null
  url: string | null
  timestamp: Date | null
  feedKey: string
  read: number // because boolean type is not indexable https://dexie.org/docs/Indexable-Type
}

export interface BaseFeed {
  title: string
  type: string
  key: string
}

export interface RssFeed extends BaseFeed {
  type: 'rss'
  url: string
}

export interface TwitterFeed extends BaseFeed {
  type: 'twitter'
  consumerKey: string
  consumerSecret: string
  accessTokenKey: string
  accessTokenSecret: string
}

export type Feed = RssFeed | TwitterFeed

export interface FeedMeta {
  feedKey: string
  purgeThreshold: Date | null
}
