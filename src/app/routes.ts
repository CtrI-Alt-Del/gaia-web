import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { ROUTES } from "../core/constants/ROUTES";

export default [
  index("routes/login.tsx"),
  route(ROUTES.parameters, "routes/telemetry/parameters.tsx"),
] satisfies RouteConfig;
