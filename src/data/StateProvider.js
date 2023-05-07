// StateProvider.js

import React, { useState } from 'react';
import { StateContext } from './StateContext';

export const StateProvider = ({ children }) => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  return (
    <StateContext.Provider value={{ state, setState }}>
      { children }
    </StateContext.Provider>
  );
};
