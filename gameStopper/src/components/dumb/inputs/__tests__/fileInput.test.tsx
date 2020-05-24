import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "emotion-theming";
import { themes } from "../../../../themes";
import { FileInput } from "../fileInput";
import { FaPlus } from "react-icons/fa";

it("renders without crashing", () => {
  const card = render(
    <ThemeProvider theme={themes.dark}>
      <FileInput icon={<FaPlus />} onFileChosen={(path) => console.log(path)} />
    </ThemeProvider>
  );
});
