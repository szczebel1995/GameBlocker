import * as glob from "glob";
import * as launchersData from "./serverMocks/launchers.json";
import { GamesStore } from "./stores/gamesStore";
import { LauncherStore, ILauncherStore } from "./stores/launcherStore";
import { uniq, compact, zipObject } from "lodash";
import * as battlenetGames from "./serverMocks/battlenetGames.json";
import { GameStore } from "./stores/gameStore";
import { getSnapshot } from "mobx-state-tree";

const gamesStore = GamesStore.create({});

const getLauncherFolder = (exeName: string): Promise<string[] | Error> => {
  return new Promise((resolve) => {
    glob(
      `C://Program Files (x86)/**/${exeName}`,
      { strict: false },
      (err, files) => resolve(err ? err : files)
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
    glob(`${gamesFolder}/**/*.exe`, { strict: false }, (err, files) =>
      resolve(err ? err : files)
    );
  });

  let gameNames = [];
  if (launcher === "Steam") {
    const excluded = ["Steamworks Shared"];
    gameNames = uniq(
      gamesUrls
        .map((name) => name.split("/Steam/steamapps/")[1].split("/")[1])
        .filter((name) => !excluded.includes(name))
    );
  } else if (launcher === "Origin") {
    gameNames = uniq(
      gamesUrls.map((name) => name.split("/Origin Games/")[1].split("/")[0])
    );
  } else if (launcher === "Uplay") {
    gameNames = uniq(
      gamesUrls.map(
        (name) => name.split("/Ubisoft Game Launcher/games/")[1].split("/")[0]
      )
    );
  } else if (launcher === "GOG") {
    gameNames = uniq(
      gamesUrls.map((name) => name.split("/GOG Galaxy/Games/")[1].split("/")[0])
    );
  } else if (launcher === "Epic Games") {
    gameNames = uniq(
      gamesUrls.map((name) => name.split("/Epic Games/")[1].split("/")[0])
    );
  } else if (launcher === "Battle.net") {
    gamesUrls = compact(
      await Promise.all(
        battlenetGames.games.map((game) =>
          getPfFolder(`${game.path}/*.exe`).then((res: any) =>
            res.pf64.length > 0 ? res.pf64[0] : res.pf32[0]
          )
        )
      )
    );
    gameNames = gamesUrls.map((name) => {
      const splitedName = name.split("/");
      return splitedName[splitedName.length - 2];
    });
  }

  return gameNames.map((name, i) =>
    GameStore.create({ name, paths: gamesUrls })
  );
};

const getPfFolder = async (folderName: string) => {
  const pf32: Error | string[] = await new Promise((resolve) => {
    glob(
      `C://Program Files (x86)/${folderName}`,
      { strict: false },
      (err, files) => {
        resolve(err ? err : files);
      }
    );
  });
  const pf64: Error | string[] = await new Promise((resolve) => {
    glob(`C://Program Files/${folderName}`, { strict: false }, (err, files) => {
      resolve(err ? err : files);
    });
  });
  return { pf32, pf64 };
};

const getAllLauncherFolders = async () => {
  const launchers = await Promise.all(
    launchersData.launchers.map((launcher) => {
      return new Promise(async (resolve) => {
        const launcherPath = await getLauncherFolder(launcher.exe);
        const gamesFolderPath = await getLauncherGamesFolder(
          launcher.gamesFolder
        );
        const launcherGames = await getLauncherGames(
          gamesFolderPath,
          launcher.name
        );
        resolve(
          LauncherStore.create({
            name: launcher.name,
            paths: launcherPath as string[],
            gamesMap: zipObject(
              launcherGames.map((game) => game.name),
              launcherGames
            ),
          })
        );
        // const gamesFolder = getPfFolder(launcher.gamesFolder);
        // return LauncherStore.create({ name: launcher.name, path:  });
        // console.log(gamesFolder);
      });
    })
  );
  console.log(launchers.map((launcher) => JSON.stringify(launcher)));
};

getAllLauncherFolders();
// const blizzardGamesUrls = Promise.all(
//   battlenetGames.games.map((game) => getPfFolder(`${game.path}/`))
// ).then((res) => console.log(res));

// glob(
//   `C://Program Files (x86)/GOG Galaxy/Games/`,
//   { strict: false },
//   (err, files) => {
//     console.log(err ? err : files);
//   }
// );

// LAUNCHERS:
// /Steam/steamapps
// /Origin Games
// Ubisoft/Ubisoft Game Launcher/games/
// GOG Galaxy\Games
// Epic Games
// Battle.net installs straight to program files need to hardcode then
