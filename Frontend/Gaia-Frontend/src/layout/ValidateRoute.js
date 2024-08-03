import React, { Suspense } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import Drawer from "../common/Drawer";
import Footer from "../common/Footer";
import useAuth from "../hooks/useAuth";
import useDrawer from "../hooks/useDrawer";
import { MainContainer } from "../styledComponent/dashboardPage";
import { routesConstants } from "../utils/routeConstant";
import NoRouteMatch from "../components/noRouteMatch";

const ValidateRoute = ({ children, type, roles }) => {
  const { authorized, role } = useAuth();
  const [isDrawerOpen] = useDrawer();
  const location = useLocation();

  if (role && !roles.includes(role)) {
    return <NoRouteMatch title="You are not authorize to access this page." />;
  }

  if (type === "protected") {
    if (authorized === false) {
      return (
        <Navigate
          replace
          to={routesConstants.login.path}
          state={{ path: location.pathname }}
        />
      );
    } else {
      return (
        <Suspense fallback={"Loading..."}>
          <Navbar />
          <Drawer />
          <MainContainer drawerOpen={isDrawerOpen}>{children}</MainContainer>
          <Footer />
        </Suspense>
      );
    }
  } else if (type === "public") {
    if (authorized === true) {
      return (
        <Navigate
          replace
          to={routesConstants.dashboard.path}
          state={{ path: location.pathname }}
        />
      );
    } else {
      return <Suspense fallback={"Loading..."}>{children}</Suspense>;
    }
  }
};

export default ValidateRoute;
