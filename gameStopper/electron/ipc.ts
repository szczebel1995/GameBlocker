import { ipcMain } from "electron";
import { getAllLauncherFolders } from "./scan";
import { addBlocks, removeAllBlocks, getBlocks } from "./registry";
import { localDbStore } from "./stores/localDbStore";

ipcMain.handle("scan", async (event, arg) => {
  const launchers = await getAllLauncherFolders();
  return { launchers };
});

ipcMain.handle("addBlocks", async (event, arg) => {
  return await addBlocks(arg);
});

ipcMain.handle("removeBlocks", async (event, arg) => {
  return await removeAllBlocks();
});

ipcMain.handle("getBlocks", async (event, arg) => {
  return await getBlocks();
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
