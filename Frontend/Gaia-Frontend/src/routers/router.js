import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routeList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={`route-${route.path}-${index}`} {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
