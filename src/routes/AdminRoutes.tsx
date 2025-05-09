
import React from 'react';
import { Route } from "react-router-dom";
import useAdminRoutes from "../hooks/routing/useAdminRoutes";

const AdminRoutes = () => {
  // Get routes from the hook, but render them here as a React Fragment
  return (
    <React.Fragment>
      {useAdminRoutes()}
    </React.Fragment>
  );
};

export default AdminRoutes;
