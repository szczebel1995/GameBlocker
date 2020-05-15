import {
  types,
  IDisposer,
  IMSTMap,
  onPatch,
  getSnapshot,
} from "mobx-state-tree";
import { ipcStore } from "../ipcStore";
import { types as uTypes } from "util";

export const LocalDbStore = types
  .model({})
  .volatile((self) => ({
    syncMap: new Map<string, IDisposer>(),
  }))
  .actions((self) => {
    const saveToDb = (key: string, data: any) => {
      return ipcStore.invoke("saveDbData", { key, data });
    };

    const getFromDb = async (key: string) => {
      const data = await ipcStore.invoke("getDbData", key);
      return uTypes.isNativeError(data) ? data : Object.values(data);
    };

    const removeFromDb = (key: string) => {
      return ipcStore.invoke("deleteDbData", key);
    };

    const toggleSyncMapWithDb = ({
      on,
      syncId,
      map,
      dbKey,
    }: {
      on: boolean;
      syncId: string;
      map: IMSTMap<any>;
      dbKey: string;
    }) => {
      if (on) {
        const sync = syncMapWithDb(map, dbKey);
        self.syncMap.set(syncId, sync);
      } else {
        const disposer = self.syncMap.get(syncId);
        if (!disposer) {
          return console.error("can't turn off sync that is not in the map");
        }
        disposer();
      }
    };

    const syncMapWithDb = (map: IMSTMap<any>, dbKey: string) => {
      return onPatch(map, ({ op, path, value }) => {
        const splitedPath = path.split("/");
        const storeId = splitedPath[1];
        const storeWasModified = splitedPath.length >= 3;
        const mapWasModified = splitedPath.length === 2;

        if (mapWasModified && op === "remove") {
          removeFromDb(`${dbKey}.${storeId}`);
        } else {
          const store = storeWasModified ? map.get(storeId) : value;
          saveToDb(`${dbKey}.${storeId}`, getSnapshot(store));
        }
      });
    };

    return {
      saveToDb,
      getFromDb,
      removeFromDb,
      toggleSyncMapWithDb,
    };
  });

export const localDbStore = LocalDbStore.create({});
