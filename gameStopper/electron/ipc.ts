import { ipcMain } from "electron";
import { getAllLauncherFolders } from "./scan";
import { addBlocks, removeAllBlocks } from "./registry";

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
