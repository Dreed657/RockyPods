import React from 'react';
import { ThemeProvider } from '@material-ui/styles';

import Dashboard from './components/Dashboard';
import Themes from './themes';
import { CssBaseline } from '@material-ui/core';

function App() {
  return (
    <ThemeProvider theme={Themes.default}>
      <CssBaseline />
      <Dashboard></Dashboard>
    </ThemeProvider>
  );
}

export default App;
