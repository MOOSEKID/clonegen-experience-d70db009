
import React from 'react';
import { Route } from "react-router-dom";
import { useAdminRoutes } from "../hooks/routing/useAdminRoutes";

const AdminRoutes = () => {
  // Get routes from the hook
  const adminRoutes = useAdminRoutes();
  
  // Render routes as React components
  return (
    <React.Fragment>
      {adminRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path.replace('/admin/', '')}
          element={route.element}
        >
          {route.children?.map((child) => (
            <Route
              key={child.path}
              path={child.path}
              element={child.element} 
            />
          ))}
        </Route>
      ))}
    </React.Fragment>
  );
};

export default AdminRoutes;
