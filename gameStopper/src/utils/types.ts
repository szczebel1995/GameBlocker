import { ILauncherStore } from "../stores/objects/launcherStore";

export const isLauncher = (suspect: any): suspect is ILauncherStore => {
  return suspect.gamesMap ? true : false;
};
