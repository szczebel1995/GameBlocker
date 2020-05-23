import { types, flow, getEnv } from "mobx-state-tree";
import { LauncherStore, ILauncherStore } from "./objects/launcherStore";
import { GameStore, IGameStore } from "./objects/gameStore";
import { zipObject } from "lodash";
import { types as uTypes } from "util";
import { IEnvStore } from "./envStore";

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
    let inited: boolean | undefined;

    return {
      inited,
    };
  })
  .actions((self) => {
    const afterCreate = () => {
      const game = GameStore.create({
        id: "sdfjllskdfj",
        name: "Legends of Runeterra",
      });
      addGame(game);
    };

    const afterAttach = () => {
      init();
    };

    const init = flow(function* () {
      console.log("@_@", self.gamesMap);
      const err = yield loadSavedGamesAndLaunchers();
      if (err) {
        self.inited = false;
        return err;
      }
      syncGamesAndLaunchersMapWithDb();
      self.inited = true;
    });

    const syncGamesAndLaunchersMapWithDb = () => {
      const { db } = getEnv<IEnvStore>(self);
      db.toggleSyncDbWithMap({
        on: true,
        syncId: "gamesStoreSync",
        map: self.gamesMap,
        dbKey: "games",
      });
      db.toggleSyncDbWithMap({
        on: true,
        syncId: "gamesStoreSync",
        map: self.launchersMap,
        dbKey: "launchers",
      });
    };

    const loadSavedGamesAndLaunchers = flow(function* () {
      const { db } = getEnv<IEnvStore>(self);
      const games: IGameStore[] | Error = yield db.getFromDb("games");
      const launchers: ILauncherStore[] | Error = yield db.getFromDb(
        "launchers"
      );
      if (uTypes.isNativeError(games) || uTypes.isNativeError(launchers)) {
        return uTypes.isNativeError(games) ? games : launchers;
      }
      launchers.forEach((launcher) => addLauncher(launcher));
      games.forEach((game) => addGame(game));
    });

    const scanForLaunchers = flow(function* () {
      self.scanning = true;
      const { ipc } = getEnv<IEnvStore>(self);
      const { launchers } = yield ipc.invoke("scan", "");
      launchers
        .map((launcher: string) => JSON.parse(launcher))
        .map((launcher: ILauncherStore) => {
          launcher.id = launcher.name;
          Object.values(launcher.gamesMap).forEach((game) =>
            addGame(
              GameStore.create({
                id: `${game?.name}`,
                ...game,
                launcher: launcher.name,
              })
            )
          );
          const gamesNames = Object.keys(launcher.gamesMap);
          launcher.gamesMap = zipObject(gamesNames, gamesNames) as any;
          addLauncher(LauncherStore.create(launcher as any));
        });
      self.scanning = false;
    });

    // right now there is no list of games and no good way of guessing
    // so user have to block games manually, in the future we can build
    // games list and check if user have those .exe's
    const scanForGames = (): IGameStore[] => {
      return [];
    };

    const addLauncher = (launcher: ILauncherStore) => {
      self.launchersMap.set(launcher.id, launcher);
    };

    const addGame = (game: IGameStore) => {
      self.gamesMap.set(game.id, game);
      if (game.launcher) {
        addGameToLauncher(game, game.launcher);
      }
    };

    const addGameToLauncher = (game: IGameStore, newLauncherId: string) => {
      const launcherToAttachGameTo = self.launchersMap.get(newLauncherId);
      if (!launcherToAttachGameTo) {
        throw new Error("cannot add game to launcher that is not in the map");
      }
      self.launchersMap.get(game.launcher || "")?.removeGame(game.id);
      launcherToAttachGameTo.addGame(game);
      game.setLauncher(newLauncherId);
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

    return {
      afterCreate,
      afterAttach,
      addLauncher,
      addGame,
      scanForLaunchers,
      removeGame,
      removeLauncher,
      addGameToLauncher,
    };
  });

export const gamesStore = GamesStore.create({});
