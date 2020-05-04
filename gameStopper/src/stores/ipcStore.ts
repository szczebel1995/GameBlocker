import { types } from "mobx-state-tree";
// import { ipcRenderer } from "electron";
const { ipcRenderer } = window.require("electron");

export const IpcStore = types.model({}).actions((self) => {
  const afterCreate = () => {};

  const sendMessage = (room: string, message: any, resRoom: string) => {
    return new Promise((resolve) => {
      ipcRenderer.once(resRoom, (event: any, arg: any) => {
        resolve(arg);
      });

      ipcRenderer.send(room, message);
    });
  };

  return {
    afterCreate,
    sendMessage,
  };
});

export const ipcStore = IpcStore.create({});
