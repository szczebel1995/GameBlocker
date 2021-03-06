import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "emotion-theming";
import { HamburgerMenu } from "../hamburgerMenu";
import { themes } from "../../../themes";

it("renders without crashing", () => {
  const card = render(
    <ThemeProvider theme={themes.dark}>
      <HamburgerMenu />
    </ThemeProvider>
  );
});
