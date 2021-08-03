import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import Dashboard from './components/Dashboard';
import Themes from './themes';

function App() {
  return (
    <ThemeProvider theme={Themes.default}>
      <CssBaseline />
      <Dashboard></Dashboard>
    </ThemeProvider>
  );
}

export default App;
