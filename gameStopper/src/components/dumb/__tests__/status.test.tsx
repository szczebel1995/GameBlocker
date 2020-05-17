import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "emotion-theming";
import { themes } from "../../../themes";
import { Status } from "../status";
import { Fa500Px } from "react-icons/fa";

it("renders without crashing", () => {
  const card = render(
    <ThemeProvider theme={themes.dark}>
      <Status icon={<Fa500Px />} message="" />
    </ThemeProvider>
  );
});
