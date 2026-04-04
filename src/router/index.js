import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import StarterProjectView from '../views/StarterProjectView.vue'
import WetlandDistributionView from '../views/WetlandDistributionView.vue'
import AboutUsView from '../views/AboutUsView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      path: '/projects/starter',
      name: 'starter-project',
      component: StarterProjectView,
      meta: { titleKey: 'starterProject.metaTitle' },
    },
    {
      path: '/maps/wetland-distribution',
      name: 'wetland-distribution',
      component: WetlandDistributionView,
      meta: { titleKey: 'wetlandDistribution.metaTitle' },
    },
    {
      path: '/about',
      name: 'about-us',
      component: AboutUsView,
      meta: { titleKey: 'aboutUs.metaTitle' },
    },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 0 }
    }
    return { top: 0, left: 0 }
  },
})
