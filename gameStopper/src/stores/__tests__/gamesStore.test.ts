import { wait } from "../../utils/async";
import { GamesStore } from "../gamesStore";
import { types } from "mobx-state-tree";
import { IGameStore, GameStore } from "../objects/gameStore";
import { ILauncherStore, LauncherStore } from "../objects/launcherStore";

// jest.mock("electron");

afterEach(() => {});

const RootStore = types.model({
  gamesStore: GamesStore,
});

const initStores = async ({
  games,
  launchers,
}: {
  games?: IGameStore[] | Error;
  launchers?: ILauncherStore[] | Error;
}) => {
  const promise = () => Promise.resolve({});
  const ipcStore = { invoke: jest.fn(promise) };
  const dbStore = {
    saveToDb: jest.fn(promise),
    getFromDb: jest.fn(promise),
    removeFromDb: jest.fn(promise),
    toggleSyncDbWithMap: jest.fn(promise),
  };
  if (launchers) {
    dbStore.getFromDb.mockResolvedValue(launchers);
  }
  if (games) {
    dbStore.getFromDb.mockResolvedValueOnce(games);
  }

  const env = { ipc: ipcStore, db: dbStore };
  const rootStore = RootStore.create(
    { gamesStore: GamesStore.create({}) },
    env
  );
  await wait(() => rootStore.gamesStore.inited !== undefined);
  return { env, rootStore };
};

describe("correctly initializes", () => {
  it("inits with no games or launchers", async () => {
    const { env, rootStore } = await initStores({ games: [], launchers: [] });
    expect(env.db.toggleSyncDbWithMap).toBeCalledTimes(2);
    expect(rootStore.gamesStore.inited).toBe(true);
    expect(rootStore.gamesStore.games.length).toBe(0);
    expect(rootStore.gamesStore.launchers.length).toBe(0);
  });

  it("inits with games and launchers", async () => {
    const game = GameStore.create({ id: "testId", name: "testName" });
    const launcher = LauncherStore.create({ id: "testId", name: "testName" });
    const { env, rootStore } = await initStores({
      games: [game],
      launchers: [launcher],
    });
    expect(env.db.toggleSyncDbWithMap).toBeCalledTimes(2);
    expect(rootStore.gamesStore.inited).toBe(true);
    expect(rootStore.gamesStore.games.length).toBe(1);
    expect(rootStore.gamesStore.launchers.length).toBe(1);
  });

  it("aborts init when getting error from db", async () => {
    const { env, rootStore } = await initStores({
      games: new Error("brah1"),
      launchers: new Error("brah2"),
    });
    expect(env.db.toggleSyncDbWithMap).toBeCalledTimes(0);
    expect(rootStore.gamesStore.inited).toBe(false);
    expect(rootStore.gamesStore.games.length).toBe(0);
    expect(rootStore.gamesStore.launchers.length).toBe(0);
  });
});

it("adds launcher", async () => {
  const { env, rootStore } = await initStores({ games: [], launchers: [] });
  const launcher = LauncherStore.create({ id: "testId", name: "testName" });
  rootStore.gamesStore.addLauncher(launcher);
  expect(rootStore.gamesStore.launchersMap.get("testId")).toBe(launcher);
  expect(rootStore.gamesStore.launchers.length).toBe(1);
});

it("adds game", async () => {
  const { env, rootStore } = await initStores({ games: [], launchers: [] });
  const game = GameStore.create({ id: "testId", name: "testName" });
  rootStore.gamesStore.addGame(game);
  expect(rootStore.gamesStore.gamesMap.get("testId")).toBe(game);
  expect(rootStore.gamesStore.games.length).toBe(1);
});

describe("adds game to launcher", () => {
  it("throws when trying to add game to nonexisting launcher", async () => {
    const { env, rootStore } = await initStores({ games: [], launchers: [] });
    const game = GameStore.create({ id: "testId", name: "testName" });

    expect(() =>
      rootStore.gamesStore.addGameToLauncher(game, "testLauncherId")
    ).toThrow();
  });

  it("removes from previous and assigns to new launcher", async () => {
    const oldLaucher = LauncherStore.create({ id: "oldLauncher", name: "" });
    const newLauncher = LauncherStore.create({ id: "newLauncher", name: "" });
    const { env, rootStore } = await initStores({
      games: [],
      launchers: [oldLaucher, newLauncher],
    });
    const game = GameStore.create({
      id: "game",
      name: "",
      launcher: oldLaucher.id,
    });
    rootStore.gamesStore.addGameToLauncher(game, newLauncher.id);
    expect(game.launcher).toBe(newLauncher.id);
    expect(
      rootStore.gamesStore.launchersMap
        .get(newLauncher.id)
        ?.gamesMap.has(game.id)
    ).toBe(true);
    expect(
      rootStore.gamesStore.launchersMap
        .get(oldLaucher.id)
        ?.gamesMap.has(game.id)
    ).toBe(false);
  });
});

describe("removes game", () => {
  it("removes game and removes game reference from launcher", async () => {
    const launcher = LauncherStore.create({ id: "oldLauncher", name: "" });
    const game = GameStore.create({
      id: "game",
      name: "",
      launcher: launcher.id,
    });
    const { env, rootStore } = await initStores({
      games: [game],
      launchers: [launcher],
    });
    rootStore.gamesStore.removeGame(game.id);
    expect(rootStore.gamesStore.gamesMap.size).toBe(0);
    expect(
      rootStore.gamesStore.launchersMap.get(launcher.id)?.gamesMap.size
    ).toBe(0);
  });

  it("removes game that have no launcher", async () => {
    const game = GameStore.create({
      id: "game",
      name: "",
    });
    const { env, rootStore } = await initStores({
      games: [game],
      launchers: [],
    });
    rootStore.gamesStore.removeGame(game.id);
    expect(rootStore.gamesStore.gamesMap.size).toBe(0);
  });
});

it("removes launcher", async () => {
  const launcher = LauncherStore.create({ id: "oldLauncher", name: "" });
  const { env, rootStore } = await initStores({
    games: [],
    launchers: [launcher],
  });
  rootStore.gamesStore.removeLauncher(launcher.id);
  expect(rootStore.gamesStore.launchersMap.size).toBe(0);
});
