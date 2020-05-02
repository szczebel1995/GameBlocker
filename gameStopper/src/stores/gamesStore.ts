import { types } from "mobx-state-tree";
import { LauncherStore, ILauncherStore } from "./objects/launcherStore";
import { GameStore, IGameStore } from "./objects/gameStore";
import tempsave from "../assets/tempsave.json";
import { zipObject } from "lodash";

export const GamesStore = types
  .model({
    launchersMap: types.map(LauncherStore),
    gamesMap: types.map(GameStore),
  })
  .views((self) => ({
    get games() {
      return Array.from(self.gamesMap.values());
    },
    get launchers() {
      return Array.from(self.launchersMap.values());
    },
  }))
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
      // temp
      scanForLaunchers();

      self.inited = true;
    };

    const scanForGames = (): IGameStore[] => {
      return [];
    };

    const scanForLaunchers = (): ILauncherStore[] | any => {
      tempsave.launchers.map((launcher) => {
        (launcher as any).id = launcher.name;
        Object.values(launcher.gamesMap).forEach((game) =>
          addGame(
            GameStore.create({
              id: `${game?.name}`,
              ...game,
              launcher: launcher.name,
            } as any)
          )
        );
        const gamesNames = Object.keys(launcher.gamesMap);
        launcher.gamesMap = zipObject(gamesNames, gamesNames) as any;
        addLauncher(LauncherStore.create(launcher as any));
      });
    };

    const loadSavedGames = () => {
      return [];
    };

    const removeGame = (id: string) => {
      const game = self.gamesMap.get(id);
      if (game?.launcher) {
        const launcher = self.launchers.find(
          (launcher) => launcher.name === game.launcher
        );
        launcher?.removeGame(id);
      }
      self.gamesMap.delete(id);
    };

    const removeLauncher = (id: string) => {
      self.launchersMap.delete(id);
    };

    const addLauncher = (launcher: ILauncherStore) => {
      self.launchersMap.set(launcher.name, launcher);
    };

    const addGame = (game: IGameStore) => {
      self.gamesMap.set(game.id, game);
    };

    return {
      afterCreate,
      addLauncher,
      addGame,
      scanForLaunchers,
      removeGame,
      removeLauncher,
    };
  });

export const gamesStore = GamesStore.create({});
