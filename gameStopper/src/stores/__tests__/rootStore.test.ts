import { RootStore } from "../rootStore";
import { BlocksStore } from "../blocksStore";
import { IpcStore } from "../ipcStore";
import { GamesStore } from "../gamesStore";
import { LocalDbStore } from "../storage/localDbStore";
import { EnvStore } from "../envStore";
import { MainViewStore } from "../../views/mainView/mainViewStore";

it("can be created without errors", () => {
  const env = EnvStore.create({
    ipc: IpcStore.create({}),
    db: LocalDbStore.create({}),
  });
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
