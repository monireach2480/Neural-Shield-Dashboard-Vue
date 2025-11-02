import { createRouter, createWebHistory } from 'vue-router'
import GlobalThreatView from '../views/GlobalThreatView.vue'
import CategoryView from '../views/CategoryView.vue'
import AppReportView from '../views/AppReportView.vue'
import ReportsCategoryView from '../views/ReportsCategoryView.vue'

const routes = [
  {
    path: '/',
    name: 'GlobalThreat',
    component: GlobalThreatView,
    meta: { title: 'Global Threat Intelligence Dashboard' }
  },
  {
    path: '/category',
    name: 'Category',
    component: CategoryView,
    meta: { title: 'Category Distribution' }
  },
  {
    path: '/app-report',
    name: 'AppReport',
    component: AppReportView,
    meta: { title: 'App Report Dashboard' }
  },
  {
    path: '/reports-category',
    name: 'ReportsCategory',
    component: ReportsCategoryView,
    meta: { title: 'Reports by Category' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'NeuralShield Dashboard'
  next()
})

export default router