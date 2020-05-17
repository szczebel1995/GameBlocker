import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { render } from "@testing-library/react";
import { AddCard } from "../addCard";
import { ThemeProvider } from "emotion-theming";
import { themes } from "../../themes";

it("renders without crashing", () => {
  const card = render(
    <ThemeProvider theme={themes.dark}>
      <AddCard />
    </ThemeProvider>
  );
});
