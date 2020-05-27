import { ipcMain } from "electron";
import { getAllLauncherFolders } from "./scan";
import { addBlocks, removeAllBlocks, getBlocks } from "./registry";
import { localDbStore } from "./stores/localDbStore";

export const initIpc = () => {
  ipcMain.handle("scan", async (event, arg) => {
    const launchers = await getAllLauncherFolders();
    return { launchers };
  });

  ipcMain.handle("addBlocks", (event, arg) => {
    return addBlocks(arg);
  });

  ipcMain.handle("removeBlocks", (event, arg) => {
    return removeAllBlocks();
  });

  ipcMain.handle("getBlocks", (event, arg) => {
    return getBlocks();
  });

  ipcMain.handle("getDbData", (event, key) => {
    return localDbStore.getFromDb(key);
  });
  ipcMain.handle("saveDbData", (event, { key, data }) => {
    return localDbStore.saveToDb(key, data);
  });
  ipcMain.handle("deleteDbData", (event, key) => {
    return localDbStore.removeFromDb(key);
  });
  ipcMain.handle("clearDb", (event, key) => {
    return localDbStore.clearDb();
  });
};
