import { types, flow, getEnv } from "mobx-state-tree";
import { isEmpty } from "lodash";
import { types as uTypes } from "util";
import { IEnvStore } from "./envStore";

export const BlocksStore = types
  .model({
    blockOn: types.maybe(types.boolean),
  })
  .actions((self) => {
    const afterAttach = () => {
      checkIfBlockIsOn();
    };

    const checkIfBlockIsOn = flow(function* () {
      const { ipc } = getEnv<IEnvStore>(self);
      const blocks = Object.values(yield ipc.invoke("getBlocks", ""))[0];
      self.blockOn = !isEmpty(blocks);
    });

    const startBlock = flow(function* (exesToBlock: string[]) {
      const { ipc } = getEnv<IEnvStore>(self);
      const err = yield ipc.invoke("addBlocks", exesToBlock);
      if (uTypes.isNativeError(err)) {
        throw err;
      }
      self.blockOn = true;
    });

    const stopBlock = flow(function* () {
      const { ipc } = getEnv<IEnvStore>(self);
      const err = yield ipc.invoke("removeBlocks", undefined);
      if (uTypes.isNativeError(err)) {
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