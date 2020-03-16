import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { yellow, grey } from '@material-ui/core/colors';

import './App.css';

import Actors from 'features/actors/Actors';
import Shows from 'features/shows/Shows';

import Header from 'shared/containers/header/Header';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

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
    <Router>
      <div className="App">
        <ThemeProvider theme={darkTheme}>
          <Header />

          <Switch>
            <Route path="/actors">
              <Actors />
            </Route>

            <Route path="/shows">
              <Shows />
            </Route>

          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
