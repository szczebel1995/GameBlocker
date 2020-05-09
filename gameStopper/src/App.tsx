import React from "react";
import "./App.css";
import { MainView } from "./views/mainView";
import { ThemeProvider } from "emotion-theming";
import { themes } from "./themes";


const App: React.FC = () => {
  return (
    <ThemeProvider theme={themes.dark}>
      <MainView />
    </ThemeProvider>
  );
};

export default App;
