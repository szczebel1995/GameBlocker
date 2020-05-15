import { types, flow, getEnv } from "mobx-state-tree";
import { IIpcStore } from "./ipcStore";
import { isEmpty } from "lodash";
import { localDbStore } from "./storage/localDbStore";

export const BlocksStore = types
  .model({
    blockOn: types.maybe(types.boolean),
  })
  .actions((self) => {
    const afterAttach = flow(function* () {
      checkIfBlockIsOn();
    });

    const checkIfBlockIsOn = flow(function* () {
      const ipc = getEnv<any>(self);
      console.log(ipc, ipc.ipc2.invoke);
      // const blocks = Object.values(yield ipc.invoke("getBlocks", ""))[0];
      // self.blockOn = !isEmpty(blocks);
    });

    const sjdfhksjdf = () => {
      const ipc = getEnv<any>(self);
      console.log(ipc, ipc.ipc2.invoke);
    };

    const startBlock = flow(function* () {
      localDbStore.saveToDb("blockOn", true);
      self.blockOn = true;
    });

    const stopBlock = flow(function* () {
      localDbStore.saveToDb("blockOn", false);
      self.blockOn = false;
    });

    return {
      startBlock,
      stopBlock,
      sjdfhksjdf,
      afterAttach,
    };
  });

export const blocksStore = BlocksStore.create({});
