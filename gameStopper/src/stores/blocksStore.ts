import { types, flow } from "mobx-state-tree";
import { gamesStore } from "./gamesStore";
import { ipcStore } from "./ipcStore";
import { flatten, isEmpty } from "lodash";
import { localDbStore } from "./localDbStore";

export const BlocksStore = types
  .model({
    blockOn: types.maybe(types.boolean),
  })
  .actions((self) => {
    const afterCreate = flow(function* () {
      const blocks = Object.values(yield ipcStore.invoke("getBlocks", ""))[0];
      self.blockOn = !isEmpty(blocks);
      // self.blockOn = yield localDbStore.getFromDb("blockOn");
    });

    const startBlock = flow(function* () {
      console.log([
        ...flatten(gamesStore.games.map((game) => game.paths)),
        ...flatten(gamesStore.launchers.map((launcher) => launcher.paths)),
      ]);
      // yield ipcStore.sendMessage(
      //   "addBlocks",
      //   [
      //     ...flatten(gamesStore.games.map((game) => game.paths)),
      //     ...flatten(gamesStore.launchers.map((launcher) => launcher.paths)),
      //   ],
      //   "addBlocksRes"
      // );
      localDbStore.saveToDb("blockOn", true);
      self.blockOn = true;
    });

    const stopBlock = flow(function* () {
      console.log([
        ...flatten(gamesStore.games.map((game) => game.paths)),
        ...flatten(gamesStore.launchers.map((launcher) => launcher.paths)),
      ]);
      // yield ipcStore.sendMessage(
      //   "removeBlocks",
      //   "",
      //   "removeBlocksRes"
      // );
      localDbStore.saveToDb("blockOn", false);
      self.blockOn = false;
    });

    return {
      afterCreate,
      startBlock,
      stopBlock,
    };
  });

export const blocksStore = BlocksStore.create({});
