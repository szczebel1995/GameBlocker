import { types } from "mobx-state-tree";
import { BlocksStore } from "./blocksStore";
import { GamesStore } from "./gamesStore";
import { MainViewStore } from "./ui/mainViewStore";

export const RootStore = types.model({
  gamesStore: GamesStore,
  blocksStore: BlocksStore,
  // UI
  mainViewStore: MainViewStore,
});
