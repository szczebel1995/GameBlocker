import { types, flow, getEnv, getParent } from "mobx-state-tree";
import { isEmpty } from "lodash";
import { IEnvStore } from "./envStore";
import { isError } from "../utils/types";
import { IGamesStore } from "./gamesStore";
import { flatten } from "lodash";

export const BlocksStore = types
  .model({
    blockOn: types.maybe(types.boolean),
    blockStartTimestamp: types.maybe(types.number),
  })
  .views((self) => ({
    get exesToBlock() {
      const { gamesStore } = getParent<{ gamesStore: IGamesStore }>(self);
      return flatten([
        ...gamesStore.games.map((game) => game.paths),
        ...gamesStore.launchers.map((launcher) => launcher.paths),
      ]).map((path) => path.split("\\")[path.split("\\").length - 1]);
    },
  }))
  .actions((self) => {
    const afterAttach = () => {
      checkIfBlockIsOn();
    };

    const checkIfBlockIsOn = flow(function* () {
      const { ipc } = getEnv<IEnvStore>(self);
      const blocks = Object.values(yield ipc.invoke("getBlocks", ""));
      const timestampBlock: any = blocks.find(
        (block: any) => block[0] === "blockStartTimestamp"
      );
      if (timestampBlock) {
        self.blockStartTimestamp = +timestampBlock[1].value;
      }
      self.blockOn = !isEmpty(blocks);
    });

    const startBlock = flow(function* (exesToBlock: string[]) {
      const { ipc } = getEnv<IEnvStore>(self);
      const err = yield ipc.invoke("addBlocks", exesToBlock);
      if (isError(err)) {
        throw err;
      }
      self.blockStartTimestamp = Date.now();
      self.blockOn = true;
    });

    const stopBlock = flow(function* () {
      const { ipc } = getEnv<IEnvStore>(self);
      const err = yield ipc.invoke("removeBlocks", undefined);
      if (isError(err)) {
        throw err;
      }
      self.blockOn = false;
    });

    return {
      afterAttach,
      startBlock,
      stopBlock,
    };
  });

export const blocksStore = BlocksStore.create({});
