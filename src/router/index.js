import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomePage.vue'
import AboutView from '../pages/AboutPage.vue'
import PlaygroundPage from '../legacy/PlaygroundPage.vue'
import PredictedPage from '../pages/predicted/PredictedPage.vue'
import QueuePage from '../pages/queue/QueuePage.vue'
import EventListPage from '../pages/events/EventListPage.vue'
import EventPage from '../pages/events/EventPage.vue'
import GroupPage from '../pages/groups/GroupPage.vue'
import GroupListPage from '../pages/groups/GroupListPage.vue'
import AccountView from '../pages/AccountPage.vue'
import RecentMatchView from '../legacy/RecentMatchPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/events',
      children: [
        {
          path: '/create',
          name: 'New event',
          component: EventPage
        },
        {
          path: '/edit/:id',
          name: 'Edit event',
          component: EventPage
        },
        {
          path: '',
          name: 'Custom events',
          component: EventListPage
        }
      ]
    },
    {
      path: '/groups',
      children: [
        {
          path: '/create',
          name: 'New group',
          component: GroupPage
        },
        {
          path: '/edit/:id',
          name: 'Edit group',
          component: GroupPage
        },
        {
          path: '',
          name: 'Prediction Groups',
          component: GroupListPage
        }
      ]
    },
    {
      path: '/queue',
      name: 'Task queue',
      component: QueuePage
    },
    {
      path: '/predicted',
      name: 'Completed predictions',
      component: PredictedPage
    },
    {
      path: '/account',
      name: 'Account',
      component: AccountView
    },
    {
      path: '/info',
      name: 'Workflow',
      component: AboutView
    },
    {
      path: '/playground',
      name: 'Playground',
      component: PlaygroundPage
    },
    {
      path: '/recent',
      name: 'Recent match',
      component: RecentMatchView
    },
    {
      path: '/match/:id',
      name: 'Match',
      component: HomeView
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      redirect: '/predicted'
    }
  ]
})

export default router
