import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { yellow, grey } from '@material-ui/core/colors';
import logo from './logo.svg';
import './App.css';

import Actors from 'features/actors/Actors';
import Header from 'shared/containers/header/Header';

const darkTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: yellow,
    secondary: grey,
    background: {
      default: "#ffffff"
    }
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Header />
        <Actors />
      </ThemeProvider>
    </div>
  );
}

export default App;
