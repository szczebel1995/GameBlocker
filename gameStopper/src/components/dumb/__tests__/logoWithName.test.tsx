import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "emotion-theming";
import { themes } from "../../../themes";
import { LogoWithName } from "../logoWithName";

it("renders without crashing", () => {
  const card = render(
    <ThemeProvider theme={themes.dark}>
      <LogoWithName />
    </ThemeProvider>
  );
});
