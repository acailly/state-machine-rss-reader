import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Heading,
  Link,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useLiveQuery } from 'dexie-react-hooks'

import { db } from '../db'
import { NewsItem } from '../types'

import MarkFeedNewsItemAsReadButton from './MarkFeedNewsItemAsReadButton'
import MarkNewsItemAsReadButton from './MarkNewsItemAsReadButton'

const News = () => {
  const newsItems = useLiveQuery(() => db.newsItems.where({ read: 0 }).sortBy('timestamp'))
  const feeds = useLiveQuery(() => db.feeds.toArray())

  const newsItemsByFeed: Record<string, NewsItem[]> =
    newsItems?.reduce((acc, newsItem) => {
      const feedNewsItems = acc[newsItem.feedKey] ?? []
      return {
        ...acc,
        [newsItem.feedKey]: [...feedNewsItems, newsItem],
      }
    }, {} as Record<string, NewsItem[]>) ?? {}

  return (
    <Container maxW="container.lg">
      <Stack spacing={6}>
        <Stack direction="row" spacing={4} justify="space-between">
          <Heading>Nouveautés</Heading>
        </Stack>
        <Accordion colorScheme="blue" allowMultiple>
          {Object.keys(newsItemsByFeed)
            .sort((a?: string, b?: string): number => {
              return a === b ? 0 : a == null ? -1 : b == null ? 1 : a.localeCompare(b)
            })
            .map((feedKey) => {
              const feed = feeds?.find((f) => f.key === feedKey)
              const feedNewsItems = newsItemsByFeed[feedKey]
              return (
                feed && (
                  <AccordionItem key={feedKey}>
                    <h2>
                      <AccordionButton _expanded={{ bg: 'blue.500', color: 'white' }}>
                        <Box flex="1" textAlign="left">
                          <Text fontSize="lg">
                            {feed?.title} ({feedNewsItems.length})
                          </Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <MarkFeedNewsItemAsReadButton feed={feed} />
                      <List spacing={10} paddingY={6}>
                        {feedNewsItems.map((newsItem) => {
                          if (!newsItem.url || !newsItem.feedKey) {
                            return
                          }

                          const key = encodeURIComponent(newsItem.feedKey) + encodeURIComponent(newsItem.url)
                          return (
                            <ListItem key={key}>
                              <Stack direction="row" justify="space-between" spacing={4}>
                                <Stack direction="column" spacing={0}>
                                  <Text fontSize="lg">{newsItem.title}</Text>
                                  <Text fontSize="sm" color="gray.500">
                                    {newsItem.timestamp?.toLocaleDateString()}
                                  </Text>
                                  <Link color="blue.500" href={newsItem.url} isExternal>
                                    {newsItem.url} <ExternalLinkIcon mx="2px" />
                                  </Link>
                                </Stack>
                                <MarkNewsItemAsReadButton newsItem={newsItem} />
                              </Stack>
                            </ListItem>
                          )
                        })}
                      </List>
                    </AccordionPanel>
                  </AccordionItem>
                )
              )
            })}
        </Accordion>
      </Stack>
    </Container>
  )
}

export default News
