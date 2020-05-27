import { types } from "mobx-state-tree";
import { IpcStore } from "./ipcStore";
import { LocalDbStore } from "./storage/localDbStore";

export type IEnvStore = typeof EnvStore.Type;
export const EnvStore = types.model({
  ipc: IpcStore,
  db: LocalDbStore,
});
