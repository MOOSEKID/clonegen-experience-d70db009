
import React from 'react';
import { Route } from "react-router-dom";
import useMainRoutes from "../hooks/routing/useMainRoutes";

const MainRoutes = () => {
  // Get routes from the hook, but render them here as a React Fragment
  // so they can be used as children of the Routes component
  return (
    <React.Fragment>
      {useMainRoutes()}
    </React.Fragment>
  );
};

export default MainRoutes;
