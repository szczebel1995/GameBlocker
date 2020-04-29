import { types } from "mobx-state-tree";
import { GameStore } from "./gameStore";

export type ILauncherStore = typeof LauncherStore.Type;
export const LauncherStore = types.model({
  name: types.string,
  paths: types.array(types.string),
  gamesMap: types.map(GameStore),
});
