import React from "react";
import "./App.css";
import { MainView } from "./views/mainView";
import { ThemeProvider, withTheme } from "emotion-theming";
import { themes, Theme } from "./themes";
import { Global, css } from "@emotion/core";

const makeGlobalStyles = (theme: Theme) => css`
  body {
    color: ${theme.colors.primary.text};
  }
`;

const GlobalStyles = withTheme(({ theme }) => (
  <Global styles={makeGlobalStyles(theme)} />
));

const App: React.FC = () => {
  return (
    <ThemeProvider theme={themes.dark}>
      <MainView />
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
