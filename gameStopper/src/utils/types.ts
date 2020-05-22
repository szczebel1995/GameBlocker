import { ILauncherStore } from "../stores/objects/launcherStore";
import { IGameStore } from "../stores/objects/gameStore";

export const isLauncher = (suspect: any): suspect is ILauncherStore => {
  return suspect.gamesMap ? true : false;
};

export const isGame = (suspect: any): suspect is IGameStore => {
  return suspect.gamesMap === undefined;
};
