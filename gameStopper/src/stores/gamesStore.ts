import { types } from "mobx-state-tree";
import { LauncherStore, ILauncherStore } from "./objects/launcherStore";
import { GameStore, IGameStore } from "./objects/gameStore";

export const GamesStore = types
  .model({
    launchersMap: types.map(LauncherStore),
    gamesMap: types.map(GameStore),
  })
  .volatile((self) => {
    const inited = false;

    return {
      inited,
    };
  })
  .actions((self) => {
    const afterCreate = () => {
      const savedGames = loadSavedGames();
      if (savedGames.length <= 0) {
        console.log("noGames");
      }
      self.inited = true;
    };

    const loadSavedGames = () => {
      return [];
    };

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

export const gamesStore = GamesStore.create({});
