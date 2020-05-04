import { types, flow } from "mobx-state-tree";
import { LauncherStore, ILauncherStore } from "./objects/launcherStore";
import { GameStore, IGameStore } from "./objects/gameStore";
import tempsave from "../assets/tempsave.json";
import { zipObject } from "lodash";
import { ipcStore } from "./ipcStore";

export const GamesStore = types
  .model({
    launchersMap: types.map(LauncherStore),
    gamesMap: types.map(GameStore),
    scanning: types.optional(types.boolean, false),
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
    const afterCreate = flow(function* () {
      const savedGames = loadSavedGames();
      if (savedGames.length <= 0) {
        console.log("noGames");
      }
      // temp
      // yield scanForLaunchers();

      self.inited = true;
    });

    const scanForGames = (): IGameStore[] => {
      return [];
    };

    const scanForLaunchers = flow(function* () {
      self.scanning = true;
      const { launchers } = yield ipcStore.sendMessage("scan", "", "scanRes");
      console.log(launchers);
      launchers
        .map((launcher: any) => JSON.parse(launcher))
        .map((launcher: ILauncherStore) => {
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
      self.scanning = false;
    });

    const loadSavedGames = () => {
      return [];
    };

    const removeGame = (id: string) => {
      const game = self.gamesMap.get(id);
      if (game?.launcher) {
        const launcher = self.launchersMap.get(game.launcher);
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

    const addGameToLauncher = (game: IGameStore, newLauncherId: string) => {
      self.launchersMap.get(game.launcher || "")?.removeGame(game.id);
      self.launchersMap.get(newLauncherId)?.addGame(game);
      game.setLauncher(newLauncherId);
    };

    const addGame = (game: IGameStore) => {
      self.gamesMap.set(game.id, game);
      if (game.launcher) {
        const launcher = self.launchersMap.get(game.launcher);
        launcher?.addGame(game);
      }
    };

    return {
      afterCreate,
      addLauncher,
      addGame,
      scanForLaunchers,
      removeGame,
      removeLauncher,
      addGameToLauncher,
    };
  });

export const gamesStore = GamesStore.create({});
