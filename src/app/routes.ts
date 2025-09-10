import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/login.tsx'),
  route('alerting/alerts', 'routes/alerting/alerts-root.tsx'),
  route('parameters', 'routes/parameters.tsx'),
] satisfies RouteConfig
