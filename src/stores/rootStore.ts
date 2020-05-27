import { types } from "mobx-state-tree";
import { BlocksStore } from "./blocksStore";
import { GamesStore } from "./gamesStore";
import { MainViewStore } from "../views/mainView/mainViewStore";
import { EnvStore } from "./envStore";
import { IpcStore } from "./ipcStore";
import { LocalDbStore } from "./storage/localDbStore";

export const RootStore = types.model({
  gamesStore: GamesStore,
  blocksStore: BlocksStore,
  // UI
  mainViewStore: MainViewStore,
});

const env = EnvStore.create({
  ipc: IpcStore.create({}),
  db: LocalDbStore.create({}),
});

export const rootStore = RootStore.create(
  {
    blocksStore: BlocksStore.create({}),
    gamesStore: GamesStore.create({}) as any,
    mainViewStore: MainViewStore.create({}) as any,
  },
  env
);
