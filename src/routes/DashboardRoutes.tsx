
import React from 'react';
import { Route } from "react-router-dom";
import useDashboardRoutes from "../hooks/routing/useDashboardRoutes";

const DashboardRoutes = () => {
  // Get routes from the hook, wrap them in a React Fragment
  return (
    <React.Fragment>
      {useDashboardRoutes()}
    </React.Fragment>
  );
};

export default DashboardRoutes;
