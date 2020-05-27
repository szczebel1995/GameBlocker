import {
  types,
  IDisposer,
  IMSTMap,
  onPatch,
  getSnapshot,
  getParent,
} from "mobx-state-tree";
import { IEnvStore } from "../envStore";
import { isError } from "../../utils/types";

export const LocalDbStore = types
  .model({})
  .volatile((self) => ({
    syncMap: new Map<string, IDisposer>(),
  }))
  .actions((self) => {
    const saveToDb = (key: string, data: any) => {
      const { ipc } = getParent<IEnvStore>(self);
      return ipc.invoke("saveDbData", { key, data });
    };

    const getFromDb = async (key: string) => {
      const { ipc } = getParent<IEnvStore>(self);
      const data = await ipc.invoke("getDbData", key);
      return !data || isError(data) ? data : Object.values(data);
    };

    const removeFromDb = (key: string) => {
      const { ipc } = getParent<IEnvStore>(self);
      return ipc.invoke("deleteDbData", key);
    };

    const toggleSyncDbWithMap = ({
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
        const sync = _syncMapWithDb(map, dbKey);
        self.syncMap.set(syncId, sync);
      } else {
        const disposer = self.syncMap.get(syncId);
        if (!disposer) {
          throw new Error("can't turn off sync that is not in the map");
        }
        disposer();
        self.syncMap.delete(syncId);
      }
    };

    const _syncMapWithDb = (map: IMSTMap<any>, dbKey: string) => {
      return onPatch(map, ({ op, path, value }) => {
        const splitedPath = path.split("/");
        const storeId = splitedPath[1];
        const storeWasModified = splitedPath.length >= 3;
        const mapWasModified = splitedPath.length === 2;
        const escapedStoreId = storeId.replace(".", "_");

        if (mapWasModified && op === "remove") {
          removeFromDb(`${dbKey}.${escapedStoreId}`);
        } else {
          const store = storeWasModified ? map.get(storeId) : value;
          saveToDb(
            `${dbKey}.${escapedStoreId}`,
            storeWasModified ? getSnapshot(store) : value
          );
        }
      });
    };

    return {
      saveToDb,
      getFromDb,
      removeFromDb,
      toggleSyncDbWithMap,
      _syncMapWithDb,
    };
  });

export const localDbStore = LocalDbStore.create({});
