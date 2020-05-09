import { ipcMain } from "electron";
import { getAllLauncherFolders } from "./scan";
import { addBlocks, removeAllBlocks, getBlocks } from "./registry";
import { localDbStore } from "./stores/localDbStore";

export const hello = 1;

ipcMain.on("scan", async (event, arg) => {
  const launchers = await getAllLauncherFolders();
  event.reply("scanRes", { launchers });
});

ipcMain.on("addBlocks", async (event, arg) => {
  const results = await addBlocks([arg.exes]);
  event.reply("addBlocksRes", { results });
});

ipcMain.on("removeBlocks", async (event, arg) => {
  const results = await removeAllBlocks();
  event.reply("removeBlocksRes", { results });
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
