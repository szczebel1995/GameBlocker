import * as glob from "glob";
import * as launchersData from "./serverMocks/launchers.json";
import { LauncherStore, ILauncherStore } from "./stores/objects/launcherStore";
import { uniq, compact, zipObject } from "lodash";
import * as battlenetGames from "./serverMocks/battlenetGames.json";
import { GameStore } from "./stores/objects/gameStore";

const getLauncherFolders = (exeNames: string[]): Promise<string[] | Error> => {
  return new Promise((resolve) => {
    glob(
      `C://Program Files (x86)/**/+(${exeNames.join("|")})`,
      { strict: false },
      (err: any, files: any) => resolve(err ? err : files)
    );
  });
};

const getLauncherGamesFolder = async (folderName: string) => {
  if (!folderName) {
    return;
  }

  const paths = (await getPfFolder(folderName)) as any;
  return paths.pf64.length > 0 ? paths.pf64[0] : paths.pf32[0];
};

const getLauncherGames = async (gamesFolder: string, launcher: string) => {
  let gamesUrls: Error | string[] | any = await new Promise((resolve) => {
    glob(`${gamesFolder}/**/*.exe`, { strict: false }, (err: any, files: any) =>
      resolve(err ? err : files)
    );
  });
  let gamesUrlsMap: any = {};
  let gameNames: any = [];

  if (launcher === "Battle.net") {
    gamesUrls = compact(
      await Promise.all(
        battlenetGames.games.map((game) =>
          getPfFolder(`${game.path}/*.exe`).then((res: any) =>
            res.pf64.length > 0 ? res.pf64[0] : res.pf32[0]
          )
        )
      )
    );
    gameNames = gamesUrls.map((path: string) => {
      const splitedPath = path.split("/");
      const gameName = splitedPath[splitedPath.length - 2];
      if (gamesUrlsMap[gameName]) {
        gamesUrlsMap[gameName].push(path);
      } else {
        gamesUrlsMap[gameName] = [path];
      }
      return gameName;
    });
  } else {
    gamesUrlsMap = createMapFromLauncherGamesPaths(
      gamesUrls,
      gamesFolder,
      launcher === "Steam" ? ["Steamworks Shared"] : [],
      launcher
    );
    gameNames = Object.keys(gamesUrlsMap);
  }

  return gameNames.map((name: string) =>
    GameStore.create({ id: name, name, paths: gamesUrlsMap[name] })
  );
};

const createMapFromLauncherGamesPaths = (
  gamesUrls: string[],
  gamesFolderName: string,
  excludedGames: string[],
  launcher: string
) => {
  const gamesUrlsMap: any = {};
  gamesUrls
    .filter(
      (path: string) =>
        !excludedGames.includes(
          getGameNameFromPath(path, gamesFolderName, launcher)
        )
    )
    .map((path: string) => {
      const gameName = getGameNameFromPath(path, gamesFolderName, launcher);
      if (gamesUrlsMap[gameName]) {
        gamesUrlsMap[gameName].push(path);
      } else {
        gamesUrlsMap[gameName] = [path];
      }
      return gameName;
    });
  return gamesUrlsMap;
};

const getGameNameFromPath = (
  path: string,
  gamesFolderName: string,
  launcher: string
) => {
  return path.split(gamesFolderName)[1].split("/")[
    launcher === "Steam" ? 1 : 0
  ];
};

const getPfFolder = async (folderName: string) => {
  const pf32: Error | string[] = await new Promise((resolve) => {
    glob(
      `C://Program Files (x86)/${folderName}`,
      { strict: false },
      (err: any, files: any) => {
        resolve(err ? err : files);
      }
    );
  });
  const pf64: Error | string[] = await new Promise((resolve) => {
    glob(
      `C://Program Files/${folderName}`,
      { strict: false },
      (err: any, files: any) => {
        resolve(err ? err : files);
      }
    );
  });
  return { pf32, pf64 };
};

export const getAllLauncherFolders = async () => {
  const launcherPaths = await getLauncherFolders(
    launchersData.launchers.map((launcher) => launcher.exe)
  );
  const launchers = await Promise.all(
    launchersData.launchers.map((launcher, i) => {
      return new Promise(async (resolve) => {
        const launcherPath = (launcherPaths as any).filter((path: any) =>
          path.includes(launcher.exe)
        );
        const gamesFolderPath = await getLauncherGamesFolder(
          launcher.gamesFolder
        );
        const launcherGames = await getLauncherGames(
          gamesFolderPath,
          launcher.name
        );
        resolve({
          id: launcher.name,
          name: launcher.name,
          paths: launcherPath as string[],
          gamesMap: zipObject(
            launcherGames.map((game: any) => game.name),
            launcherGames
          ),
        });
      });
    })
  );

  return launchers.map((launcher) => JSON.stringify(launcher));
};
