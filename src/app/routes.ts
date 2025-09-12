import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/login.tsx'),
  route('alerting/alerts', 'routes/alerting/alarms-root.tsx'),
  route('parameters', 'routes/parameters.tsx'),
] satisfies RouteConfig
