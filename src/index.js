import React from "react";
import { render } from "react-dom";
import {
  colors,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import App from "./App";

const customTheme = createTheme({
  palette: {
    type: "dark",
    primary: colors.blue,
    background: {
      default: "#121212",
      paper: "#202020",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const container = document.getElementById("app");

render(
  <ThemeProvider theme={customTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  container
);
