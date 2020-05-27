import { ILauncherStore } from "../stores/objects/launcherStore";
import { IGameStore } from "../stores/objects/gameStore";
const uTypes = window.require("util").types;

export const isLauncher = (suspect: any): suspect is ILauncherStore => {
  return suspect.gamesMap ? true : false;
};

export const isGame = (suspect: any): suspect is IGameStore => {
  return suspect.gamesMap === undefined;
};

export const isError = (suspect: any): suspect is Error => {
  return uTypes.isNativeError(suspect);
};
