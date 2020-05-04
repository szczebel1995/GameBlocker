import { ipcMain } from "electron";
import { getAllLauncherFolders } from "./scan";

export const hello = 1;

ipcMain.on("scan", async (event, arg) => {
  const launchers = await getAllLauncherFolders();
  event.reply("scanRes", { launchers });
});
