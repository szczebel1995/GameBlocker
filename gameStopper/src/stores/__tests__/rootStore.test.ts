import { RootStore } from "../rootStore";
import { BlocksStore } from "../blocksStore";
import { IpcStore } from "../ipcStore";
import { GamesStore } from "../gamesStore";
import { MainViewStore } from "../ui/mainViewStore";
import { LocalDbStore } from "../storage/localDbStore";

it("can be created without errors", () => {
  const env = { ipc: IpcStore.create({}), db: LocalDbStore.create({}) };
  const rootStore = RootStore.create(
    {
      blocksStore: BlocksStore.create({}),
      gamesStore: GamesStore.create({}),
      mainViewStore: MainViewStore.create({}),
    },
    env
  );
  expect(rootStore).toBeDefined();
});
