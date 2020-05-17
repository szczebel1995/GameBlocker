import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "emotion-theming";
import { themes } from "../../themes";
import { EditCard } from "../editCard";
import { GameStore } from "../../stores/objects/gameStore";

it("renders without crashing", () => {
  const card = render(
    <ThemeProvider theme={themes.dark}>
      <EditCard editedItem={GameStore.create({ id: "id", name: "name" })} />
    </ThemeProvider>
  );
});
