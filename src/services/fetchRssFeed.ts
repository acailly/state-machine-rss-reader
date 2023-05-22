import { NewsItem, RssFeed } from '../types'

import corsProxyURL from './corsProxyURL'
import httpClient from './httpClient'
import isBrowser from './isBrowser'

// parseFeed converts RSS or Atom text into a list of feed entries
// from https://github.com/zserge/headline/blob/master/app.js
function parseRawRssFeedContent(text: string): Omit<NewsItem, 'feedKey' | 'read'>[] {
  const xml = new DOMParser().parseFromString(text, 'text/xml')
  const tag = (item: Element, name: string) => (item.getElementsByTagName(name)[0] || {}).textContent
  switch (xml.documentElement.nodeName) {
    case 'rss':
      return Array.from(xml.documentElement.getElementsByTagName('item')).map((item) => {
        const pubDate = tag(item, 'pubDate')
        return {
          url: tag(item, 'link'),
          title: tag(item, 'title'),
          timestamp: pubDate ? new Date(pubDate) : null,
        }
      })
    case 'feed':
      return Array.from(xml.documentElement.getElementsByTagName('entry')).map((item) => {
        const updatedDate = tag(item, 'updated')
        return {
          url:
            Array.from(item.getElementsByTagName('link')).map((link) => {
              const rel = link.getAttribute('rel')
              if (!rel || rel === 'alternate') {
                return link.getAttribute('href')
              }
            })[0] ?? null,
          title: tag(item, 'title'),
          timestamp: updatedDate ? new Date(updatedDate) : null,
        }
      })
  }
  return []
}

const parseRssFeed = (rawRssFeedContent: string, feed: RssFeed): NewsItem[] => {
  const newsItemsWithoutFeedKey = parseRawRssFeedContent(rawRssFeedContent)
  const newsItems = newsItemsWithoutFeedKey.map((newsItemWithoutFeedKey) => {
    return { ...newsItemWithoutFeedKey, feedKey: feed.key, read: 0 }
  })
  return newsItems
}

const fetchRssFeed = (feed: RssFeed) => {
  // In browser, use a CORS proxy
  // From https://github.com/draftbit/twitter-lite/issues/41#issuecomment-467403918
  const feedUrl = isBrowser ? `${corsProxyURL}${feed.url}` : feed.url
  return httpClient.get(feedUrl).then(({ data }) => {
    return parseRssFeed(data, feed)
  })
}

export default fetchRssFeed
