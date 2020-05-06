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

  const invoke = (room: string, value: any) => {
    return ipcRenderer.invoke(room, value);
  };

  return {
    afterCreate,
    sendMessage,
    invoke,
  };
});

export const ipcStore = IpcStore.create({});
