import TwitterLite from 'twitter-lite'

import { NewsItem, TwitterFeed } from '../../types'

import corsProxyURL from './corsProxyURL'
import isBrowser from './isBrowser'

interface Tweet {
  id_str: string
  created_at: string
  full_text: string
  user: {
    name: string
  }
}

const fetchTwitterFeed = async (feed: TwitterFeed) => {
  // In browser, use a CORS proxy
  // From https://github.com/draftbit/twitter-lite/issues/41#issuecomment-467403918
  const subdomain = isBrowser ? `${corsProxyURL.slice('https://'.length)}https://api` : 'api'

  //From https://apps.twitter.com/
  const clientLite = new TwitterLite({
    subdomain,
    version: '1.1',
    consumer_key: feed.consumerKey,
    consumer_secret: feed.consumerSecret,
    access_token_key: feed.accessTokenKey,
    access_token_secret: feed.accessTokenSecret,
  })

  // Monkey patch oauth client used by twitter-lite in order to
  // ignore cors proxy url when generating authentication headers
  // @ts-expect-error private property
  const originalAuthorizeFunction = clientLite.client.authorize
  // @ts-expect-error private property
  clientLite.client.authorize = function (request, token) {
    let requestWihoutCorsProxy = request
    if (request.url.startsWith(corsProxyURL)) {
      const requestUrlNotProxyfied = request.url.slice(corsProxyURL.length)
      requestWihoutCorsProxy = { ...request, url: requestUrlNotProxyfied }
    }
    // @ts-expect-error private property
    return originalAuthorizeFunction.call(clientLite.client, requestWihoutCorsProxy, token)
  }

  const params = {
    count: '200',
    //https://developer.twitter.com/en/docs/tweets/tweet-updates
    tweet_mode: 'extended',
  }

  // https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline.html
  const tweets = await clientLite.get<Tweet[]>('statuses/home_timeline', params)

  const items: NewsItem[] = tweets.map((tweet: Tweet) => {
    return {
      title: `${tweet.user.name} - ${tweet.full_text}`,
      url: `https://twitter.com/i/web/status/${tweet.id_str}`,
      timestamp: new Date(tweet.created_at),
      feedKey: feed.key,
      read: 0,
    }
  })

  return items
}

export default fetchTwitterFeed
