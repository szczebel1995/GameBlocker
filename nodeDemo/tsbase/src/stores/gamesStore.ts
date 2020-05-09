import { types } from "mobx-state-tree";
import { LauncherStore, ILauncherStore } from "./launcherStore";
import { GameStore, IGameStore } from "./gameStore";

export const GamesStore = types
  .model({
    launchersMap: types.map(LauncherStore),
    gamesMap: types.map(GameStore),
  })
  .actions((self) => {
    const afterCreate = () => {};

    const addLauncherToMap = (launcher: ILauncherStore) => {
      self.launchersMap.set(launcher.name, launcher);
    };

    const addGameToMap = (game: IGameStore) => {
      self.gamesMap.set(game.name, game);
    };

    return {
      afterCreate,
      addLauncherToMap,
      addGameToMap,
    };
  });
