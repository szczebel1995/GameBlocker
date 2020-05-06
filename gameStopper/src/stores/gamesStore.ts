import { types, flow, onPatch, getSnapshot } from "mobx-state-tree";
import { LauncherStore, ILauncherStore } from "./objects/launcherStore";
import { GameStore, IGameStore } from "./objects/gameStore";
import tempsave from "../assets/tempsave.json";
import { zipObject, isEmpty } from "lodash";
import { ipcStore } from "./ipcStore";
import { localDbStore } from "./localDbStore";

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
      // yield ipcStore.invoke("clearDb", "");
      const savedGames = yield loadSavedGames();
      const savedLaunchers = yield loadSavedLaunchers();

      if (savedGames) {
        Object.values(savedGames).forEach((game: any) => addGame(game, false));
      }
      if (savedLaunchers) {
        Object.values(savedLaunchers).forEach((launcher: any) =>
          addLauncher(launcher, false)
        );
      }

      self.inited = true;
      syncGamesUpdatesWithDb();
    });

    const syncGamesUpdatesWithDb = () => {
      onPatch(self.gamesMap, ({ op, path, value }) => {
        const splitedPath = path.split("/");
        if (splitedPath.length >= 3) {
          localDbStore.saveToDb(
            `games.${splitedPath[1]}`,
            getSnapshot(self.gamesMap.get(splitedPath[1]) as any)
          );
        }
        console.log(op, path, value);
      });
      onPatch(self.launchersMap, ({ op, path, value }) => {
        const splitedPath = path.split("/");
        if (splitedPath.length >= 3) {
          localDbStore.saveToDb(
            `launchers.${splitedPath[1]}`,
            getSnapshot(self.launchersMap.get(splitedPath[1]) as any)
          );
        }
        console.log(op, path, value);
      });
    };

    const scanForGames = (): IGameStore[] => {
      return [];
    };

    const loadSavedGames = () => {
      return localDbStore.getFromDb("games");
    };

    const loadSavedLaunchers = () => {
      return localDbStore.getFromDb("launchers");
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

    const removeGame = (id: string, removeFromDb = true) => {
      const game = self.gamesMap.get(id);
      if (game?.launcher) {
        const launcher = self.launchersMap.get(game.launcher);
        launcher?.removeGame(id);
      }
      if (removeFromDb) {
        localDbStore.removeFromDb(`games.${id}`);
      }
      self.gamesMap.delete(id);
    };

    const removeLauncher = (id: string, removeFromDb = true) => {
      self.launchersMap.delete(id);
      if (removeFromDb) {
        localDbStore.removeFromDb(`launchers.${id}`);
      }
    };

    const addLauncher = (launcher: ILauncherStore, saveInDb = true) => {
      self.launchersMap.set(launcher.id, launcher);
      if (saveInDb) {
        localDbStore.saveToDb(
          `launchers.${launcher.id}`,
          getSnapshot(launcher)
        );
      }
    };

    const addGame = (game: IGameStore, saveInDb = true) => {
      self.gamesMap.set(game.id, game);
      if (game.launcher) {
        const launcher = self.launchersMap.get(game.launcher);
        launcher?.addGame(game);
      }
      if (saveInDb) {
        localDbStore.saveToDb(`games.${game.id}`, getSnapshot(game));
      }
    };

    const addGameToLauncher = (game: IGameStore, newLauncherId: string) => {
      self.launchersMap.get(game.launcher || "")?.removeGame(game.id);
      self.launchersMap.get(newLauncherId)?.addGame(game);
      game.setLauncher(newLauncherId);
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
