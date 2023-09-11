import Loadable from 'react-loadable'

function Loading() {
  return <div>Loading...</div>
}

const Dashboard = Loadable({
  loader: () => import('./views/pages/dashboards/index'),
  loading: Loading,
})

const DesignSystem = Loadable({
  loader: () => import('./sdq-ui/DesignSystem'),
  loading: Loading,
})

const AccessDenied = Loadable({
  loader: () => import('./views/AcessDenied'),
  loading: Loading,
})

const routes = [
  {
    path: '/dashboard',
    exact: true,
    name: 'Dashboard',
    component: Dashboard,
    permissions: ['dashboard_read', 'dashboard_write'],
  },
  {
    path: '/design-system',
    exact: true,
    name: 'DesignSystem',
    component: DesignSystem,
    permissions: true,
  },
  {
    path: '/access-denied',
    exact: true,
    name: 'accessDenied',
    component: AccessDenied,
    permissions: true,
  },
]

export default routes
