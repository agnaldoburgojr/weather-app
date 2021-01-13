import React from 'react';

import { AppProvider } from './app';

const Provider: React.FC = ({ children }) => (
  <AppProvider>{children}</AppProvider>
);

export default Provider;
