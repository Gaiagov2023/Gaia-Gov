import { roles } from "./helper";

export const routesConstants = {
  home: {
    path: "/",
    type: "public",
    role: [roles.ALL, roles.FED, roles.MUNI, roles.STATE, roles.SUB_POLITICIAN],
  },
  dashboard: {
    path: "/dashboard",
    type: "protected",
    role: [roles.ALL, roles.FED, roles.MUNI, roles.STATE, roles.SUB_POLITICIAN],
  },
  register: {
    path: "/register",
    type: "public",
    role: [roles.ALL, roles.FED, roles.MUNI, roles.STATE, roles.SUB_POLITICIAN],
  },
  login: {
    path: "/login",
    type: "public",
    role: [roles.ALL, roles.FED, roles.MUNI, roles.STATE, roles.SUB_POLITICIAN],
  },
  forgotPassword: {
    path: "/forgot-password",
    type: "public",
    role: [roles.ALL, roles.FED, roles.MUNI, roles.STATE, roles.SUB_POLITICIAN],
  },
  verifyOtp: {
    path: "/verify-otp",
    type: "public",
    role: [roles.ALL, roles.FED, roles.MUNI, roles.STATE, roles.SUB_POLITICIAN],
  },
  resetPassword: {
    path: "/reset-password",
    type: "public",
    role: [roles.ALL, roles.FED, roles.MUNI, roles.STATE, roles.SUB_POLITICIAN],
  },
  lawMakers: {
    path: "/law-makers",
    type: "protected",
    role: [roles.FED, roles.MUNI, roles.STATE],
  },
  agenda: {
    path: "/agenda",
    type: "protected",
    role: [roles.FED, roles.MUNI, roles.STATE],
  },
  bills: {
    path: "/agenda/:agenda_id",
    type: "protected",
    role: [roles.FED, roles.MUNI, roles.STATE],
  },
  termsConditions: {
    path: "/terms-condition",
    type: "public",
    role: [roles.ALL, roles.FED, roles.MUNI, roles.STATE, roles.SUB_POLITICIAN],
  },
  noRouteMatch: {
    path: "/no-route-match",
    type: "public",
    role: [roles.ALL, roles.FED, roles.MUNI, roles.STATE, roles.SUB_POLITICIAN],
  },
};
