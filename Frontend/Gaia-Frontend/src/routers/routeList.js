import { lazy } from "react";
import { routesConstants } from "../utils/routeConstant";
import { LawMakersProvider } from "../hooks/useLawMakers";
import { AgendaProvider } from "../hooks/useAgenda";
import { BillProvider } from "../hooks/useBills";
import { Navigate } from "react-router-dom";
import NoRouteMatch from "../components/noRouteMatch";
import ValidateRoute from "../layout/ValidateRoute";

const Register = lazy(() =>
  import("../components/register" /* webpackChunkName: "Register" */)
);
const Login = lazy(() =>
  import("../components/login" /* webpackChunkName: "Login" */)
);
const ForgotPassword = lazy(() =>
  import(
    "../components/forgotPassword" /* webpackChunkName: "ForgotPassword" */
  )
);
const VerifyOTP = lazy(() =>
  import("../components/verifyOTP" /* webpackChunkName: "VerifyOTP" */)
);
const ResetPassword = lazy(() =>
  import("../components/resetPassword" /* webpackChunkName: "ResetPassword" */)
);
const Dashboard = lazy(() =>
  import("../components/dashboard" /* webpackChunkName: "Dashboard" */)
);
const LawMakers = lazy(() =>
  import("../components/lawMakers" /* webpackChunkName: "LawMakers" */)
);
const Agendas = lazy(() =>
  import("../components/agendas" /* webpackChunkName: "Agendas" */)
);
const Bills = lazy(() =>
  import("../components/bills" /* webpackChunkName: "Bills" */)
);

export const routes = [
  {
    path: routesConstants.home.path,
    element: <Navigate replace to={routesConstants.dashboard.path} />,
  },
  {
    path: routesConstants.register.path,
    element: (
      <ValidateRoute
        type={routesConstants.register.type}
        roles={routesConstants.register.role}
      >
        <Register />
      </ValidateRoute>
    ),
  },
  {
    path: routesConstants.login.path,
    element: (
      <ValidateRoute
        type={routesConstants.login.type}
        roles={routesConstants.login.role}
      >
        <Login />
      </ValidateRoute>
    ),
  },
  {
    path: routesConstants.forgotPassword.path,
    element: (
      <ValidateRoute
        type={routesConstants.forgotPassword.type}
        roles={routesConstants.forgotPassword.role}
      >
        <ForgotPassword />
      </ValidateRoute>
    ),
  },
  {
    path: routesConstants.verifyOtp.path,
    element: (
      <ValidateRoute
        type={routesConstants.verifyOtp.type}
        roles={routesConstants.verifyOtp.role}
      >
        <VerifyOTP />
      </ValidateRoute>
    ),
  },
  {
    path: routesConstants.resetPassword.path,
    element: (
      <ValidateRoute
        type={routesConstants.resetPassword.type}
        roles={routesConstants.resetPassword.role}
      >
        <ResetPassword />
      </ValidateRoute>
    ),
  },
  {
    path: routesConstants.dashboard.path,
    exact: true,
    element: (
      <ValidateRoute
        type={routesConstants.dashboard.type}
        roles={routesConstants.dashboard.role}
      >
        <Dashboard />
      </ValidateRoute>
    ),
  },
  {
    path: routesConstants.lawMakers.path,
    element: (
      <ValidateRoute
        type={routesConstants.lawMakers.type}
        roles={routesConstants.lawMakers.role}
      >
        <LawMakersProvider>
          <LawMakers />
        </LawMakersProvider>
      </ValidateRoute>
    ),
  },
  {
    path: routesConstants.agenda.path,
    element: (
      <ValidateRoute
        type={routesConstants.agenda.type}
        roles={routesConstants.agenda.role}
      >
        <AgendaProvider>
          <Agendas />
        </AgendaProvider>
      </ValidateRoute>
    ),
  },
  {
    path: routesConstants.bills.path,
    element: (
      <ValidateRoute
        type={routesConstants.bills.type}
        roles={routesConstants.bills.role}
      >
        <LawMakersProvider>
          <BillProvider>
            <Bills />
          </BillProvider>
        </LawMakersProvider>
      </ValidateRoute>
    ),
  },
  {
    path: "*",
    element: <NoRouteMatch />,
  },
];
