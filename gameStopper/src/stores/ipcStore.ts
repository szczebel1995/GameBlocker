import { types } from "mobx-state-tree";
const { ipcRenderer } = window.require("electron");
// import { ipcRenderer } from "electron";

export type IIpcStore = typeof IpcStore.Type;
export const IpcStore = types.model({}).actions((self) => {
  const sendMessage = (room: string, message: any, resRoom: string) => {
    return new Promise((resolve) => {
      ipcRenderer.once(resRoom, (event: any, arg: any) => {
        resolve(arg);
      });

      ipcRenderer.send(room, message);
    });
  };

  const invoke = (room: string, value: any) => {
    return ipcRenderer.invoke(room, value);
  };

  return {
    sendMessage,
    invoke,
  };
});

export const ipcStore = IpcStore.create({});
