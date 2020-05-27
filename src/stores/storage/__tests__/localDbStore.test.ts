import { LocalDbStore } from "../localDbStore";
import { types } from "mobx-state-tree";
import { zipObject } from "lodash";

const EnvStore = types.model({ ipc: types.frozen(), db: LocalDbStore });

const initStore = () => {
  const RootStore = types.model({});
  const ipcStore = { invoke: jest.fn(() => Promise.resolve({})) };
  const env = EnvStore.create({
    ipc: ipcStore,
    db: LocalDbStore.create({}),
  });
  return { rootStore: RootStore.create({}, env), env };
};

it("saves to db", async () => {
  const { rootStore, env } = initStore();
  env.db.saveToDb("key", "data");
  expect(env.ipc.invoke).toBeCalledWith("saveDbData", {
    key: "key",
    data: "data",
  });
});

it("gets from db", () => {
  const { rootStore, env } = initStore();
  env.db.getFromDb("key");
  expect(env.ipc.invoke).toBeCalledWith("getDbData", "key");
});

it("removes from db", () => {
  const { rootStore, env } = initStore();
  env.db.removeFromDb("key");
  expect(env.ipc.invoke).toBeCalledWith("deleteDbData", "key");
});

describe("synchs db with map", () => {
  const dbKey = "dbKey";
  const mapItemStore = types.model({ name: types.string }).actions((self) => ({
    editName(name: string) {
      self.name = name;
    },
  }));
  const createTestMapStore = (mapItems?: { name: string }[]) =>
    types
      .model({ map: types.map(mapItemStore) })
      .actions((self) => ({
        addToMap(item: { name: string }) {
          self.map.set(item.name, item);
        },
        removeFromMap(key: string) {
          self.map.delete(key);
        },
      }))
      .create({
        map: mapItems
          ? zipObject(
              mapItems.map((item) => item.name),
              mapItems
            )
          : {},
      });

  it("creates onPatch dispacher", async () => {
    const { rootStore, env } = initStore();
    const store = createTestMapStore();
    const dispach = env.db._syncMapWithDb(store.map, dbKey);
    expect(dispach).toBeTruthy();
    dispach();
  });

  it("saves in db new added items to map", async () => {
    const { rootStore, env } = initStore();
    const store = createTestMapStore();
    const dispatch = env.db._syncMapWithDb(store.map, dbKey);
    store.addToMap(mapItemStore.create({ name: "1" }));
    expect(env.ipc.invoke).toBeCalledWith("saveDbData", {
      key: `${dbKey}.1`,
      data: { name: "1" },
    });
    dispatch();
  });

  it("doesn't save in db after its dispached", async () => {
    const { rootStore, env } = initStore();
    const store = createTestMapStore();
    const dispatch = env.db._syncMapWithDb(store.map, dbKey);
    dispatch();
    store.addToMap(mapItemStore.create({ name: "1" }));
    expect(env.ipc.invoke).toBeCalledTimes(0);
  });

  it("removes in db after item is removed from map", async () => {
    const { rootStore, env } = initStore();
    const store = createTestMapStore([{ name: "1" }]);
    const dispatch = env.db._syncMapWithDb(store.map, dbKey);
    store.removeFromMap("1");
    expect(env.ipc.invoke).toBeCalledWith("deleteDbData", `${dbKey}.1`);
    dispatch();
  });

  it("saves in db after in map item state was modified", async () => {
    const { rootStore, env } = initStore();
    const store = createTestMapStore([{ name: "1" }]);
    const dispatch = env.db._syncMapWithDb(store.map, dbKey);
    store.map.get("1")?.editName("modifiedName");
    expect(env.ipc.invoke).toBeCalledWith("saveDbData", {
      key: `${dbKey}.1`,
      data: { name: "modifiedName" },
    });
    dispatch();
  });

  it("saves and removes onPatch dispatcher in map", async () => {
    const { rootStore, env } = initStore();
    const store = createTestMapStore([{ name: "1" }]);
    const syncId = "kjfghkfdjg";
    env.db.toggleSyncDbWithMap({
      on: true,
      dbKey: dbKey,
      map: store.map,
      syncId: syncId,
    });
    expect(env.db.syncMap.get(syncId)).toBeDefined();
    env.db.toggleSyncDbWithMap({
      on: false,
      dbKey: dbKey,
      map: store.map,
      syncId: syncId,
    });
    expect(env.db.syncMap.get(syncId)).toBeUndefined();
  });

  it("aborts when toggling non existing sync", async () => {
    const { rootStore, env } = initStore();
    const store = createTestMapStore([{ name: "1" }]);
    const syncId = "kjfghkfdjg";
    expect(() =>
      env.db.toggleSyncDbWithMap({
        on: false,
        dbKey: dbKey,
        map: store.map,
        syncId: syncId,
      })
    ).toThrow();
  });
});
