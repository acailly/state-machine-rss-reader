import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Outlet, Route, Routes } from 'react-router-dom'

import FakeDataButton from './FakeDataButton'
import Feeds from './abonnements/Feeds'
import NewFeed from './abonnements/NewFeed'
import NewFeedRSS from './abonnements/NewFeedRSS'
import NewFeedTwitter from './abonnements/NewFeedTwitter'
import RobotFeeds from './abonnements/robot3/RobotFeeds'
import RobotNewFeed from './abonnements/robot3/RobotNewFeed'
import RobotNewFeedRSS from './abonnements/robot3/RobotNewFeedRSS'
import RobotNewFeedTwitter from './abonnements/robot3/RobotNewFeedTwitter'
import baseUrl from './allMachines/baseUrl'
import Header from './navigation/Header'
import News from './nouveautes/News'
import Backup from './sauvegarde/Backup'
import FetchingFeedsStatus from './telecharger/FetchingFeedsStatus'

const queryClient = new QueryClient()
queryClient.setDefaultOptions({
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
  mutations: {
    retry: false,
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          element={
            <>
              <Header />
              <Outlet />
              <FakeDataButton />
            </>
          }
        >
          <Route path={`${baseUrl}news`} element={<News />} />
          <Route path={`${baseUrl}feeds`} element={<Feeds />} />
          <Route path={`${baseUrl}feeds/new`} element={<NewFeed />} />
          <Route path={`${baseUrl}feeds/new/rss`} element={<NewFeedRSS />} />
          <Route path={`${baseUrl}feeds/new/twitter`} element={<NewFeedTwitter />} />
          <Route path={`${baseUrl}feeds/fetching`} element={<FetchingFeedsStatus />} />
          <Route path={`${baseUrl}backup`} element={<Backup />} />

          {/* Test routes for robot3 */}
          <Route path={`${baseUrl}robotfeeds`} element={<RobotFeeds />} />
          <Route path={`${baseUrl}robotfeeds/new`} element={<RobotNewFeed />} />
          <Route path={`${baseUrl}robotfeeds/new/rss`} element={<RobotNewFeedRSS />} />
          <Route path={`${baseUrl}robotfeeds/new/twitter`} element={<RobotNewFeedTwitter />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
