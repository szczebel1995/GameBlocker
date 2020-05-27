import { types } from "mobx-state-tree";
const { ipcRenderer } = window.require("electron");
// import { ipcRenderer } from "electron";

export type IIpcStore = typeof IpcStore.Type;
export const IpcStore = types.model({}).actions((self) => {
  const invoke = (room: string, value: any) => {
    return ipcRenderer.invoke(room, value);
  };

  return {
    invoke,
  };
});

export const ipcStore = IpcStore.create({});
