import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // Auth routes
  route("login", "routes/auth/login.tsx"),
  route("register", "routes/auth/register.tsx"),
  route("auth/confirm", "routes/auth/auth.confirm.tsx"),
  route("signout", "routes/auth/signout.tsx"),
] satisfies RouteConfig;
