import { BlocksStore } from "../blocksStore";
import { IpcStore } from "../ipcStore";
import { ipcRenderer } from "../../__mocks__/electron";
import { when } from "mobx";
import { wait } from "../../utils/async";
import { GamesStore } from "../gamesStore";
import { MainViewStore } from "../ui/mainViewStore";
import { types } from "mobx-state-tree";
import { LocalDbStore } from "../storage/localDbStore";

// jest.mock("electron");

afterEach(() => {
  ipcRenderer.invoke.mockReset();
});
const RootStore = types.model({
  gamesStore: GamesStore,
});

const initStores = async (blocks?: { [key: string]: string }) => {
  ipcRenderer.invoke.mockResolvedValueOnce(blocks ? blocks : {});

  const ipcStore = IpcStore.create({});
  const dbStore = LocalDbStore.create({});
  const env = { ipc: ipcStore, db: dbStore };
  const rootStore = RootStore.create(
    { gamesStore: GamesStore.create({}) },
    env
  );
  await wait(() => rootStore.gamesStore.inited);
  return { env, rootStore };
};

describe("correctly initializes", () => {});
