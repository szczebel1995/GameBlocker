import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "emotion-theming";
import { themes } from "../../../../themes";
import { SelectInput } from "../selectInput";

it("renders without crashing", () => {
  const card = render(
    <ThemeProvider theme={themes.dark}>
      <SelectInput
        onChange={(value) => console.log(value)}
        value={{ label: "", value: "" }}
        values={[{ label: "", value: "" }]}
      />
    </ThemeProvider>
  );
});
