import React from 'react';
import { RouterContext } from '../components/HookedRouter';

function useRouter() {
  return React.useContext(RouterContext);
}

export default useRouter;
