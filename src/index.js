import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider } from "theme-ui";
import rebass  from "@rebass/preset";
import { swiss } from '@theme-ui/presets'
import merge from 'lodash.merge'

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UserProvider } from "./utils/authContext";

import "./index.css"

const theme = merge({}, rebass, swiss)

ReactDOM.render(
  <Router>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
