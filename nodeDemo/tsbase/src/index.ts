import * as glob from "glob";
import * as launchersData from "./serverMocks/launchers.json";
import { GamesStore } from "./stores/gamesStore";
import { LauncherStore, ILauncherStore } from "./stores/launcherStore";
import { uniq, compact, zipObject } from "lodash";
import * as battlenetGames from "./serverMocks/battlenetGames.json";
import { GameStore } from "./stores/gameStore";
import { getSnapshot } from "mobx-state-tree";
import * as regedit from "regedit";

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
      });
    })
  );
  console.log(launchers.map((launcher) => JSON.stringify(launcher)));
};

const test = async () => {
  const policies = await new Promise((resolve) => {
    regedit.list(
      "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES",
      (err, res) => resolve(err ? err : res)
    );
  });
  if (!Object.values(policies)[0].keys.includes("explorer")) {
    console.log("creating");
    await new Promise((resolve) => {
      regedit.createKey(
        "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES\\explorer",
        (err) => resolve(console.log(err))
      );
    });
    await new Promise((resolve) => {
      regedit.list(
        "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES",
        (err, res) => resolve(console.log(err, res))
      );
    });
    await new Promise((resolve) => {
      regedit.putValue(
        {
          "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES\\explorer": {
            DisallowRun: {
              value: 1,
              type: "REG_DWORD",
            },
          },
        },
        (err, res) => resolve(err ? err : res)
      );
    });
    await new Promise((resolve) => {
      regedit.createKey(
        "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES\\EXPLORER\\DisallowRun",
        (err) => resolve(err)
      );
    });
  }

  const blocks = await new Promise((resolve) => {
    regedit.list(
      "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES\\EXPLORER\\DISALLOWRUN",
      (err, res) => resolve(err ? err : res)
    );
  });
  console.log(blocks);

  await new Promise((resolve) => {
    regedit.putValue(
      {
        "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES\\EXPLORER\\DisallowRun": {
          1: {
            value: "ManifoldGarden.exe",
            type: "REG_SZ",
          },
        },
      },
      (err, res) => resolve(err ? err : res)
    );
  });

  const blocks2 = await new Promise((resolve) => {
    regedit.list(
      "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES\\EXPLORER\\DISALLOWRUN",
      (err, res) => resolve(err ? err : res)
    );
  });
  console.log(blocks2);
};
test();

// const blockGameInRegistry = () => {

// }

// getAllLauncherFolders();
