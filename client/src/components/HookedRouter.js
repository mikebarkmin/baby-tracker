import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

export const RouterContext = React.createContext(null);

const HookedRouter = ({ children }) => (
  <BrowserRouter>
    <Route>
      {routeProps => (
        <RouterContext.Provider value={routeProps}>
          {children}
        </RouterContext.Provider>
      )}
    </Route>
  </BrowserRouter>
);

export default HookedRouter;
