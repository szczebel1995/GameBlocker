import { types } from "mobx-state-tree";
import { ipcStore } from "./ipcStore";

export const LocalDbStore = types.model({}).actions((self) => {
  const afterCreate = async () => {};

  const saveToDb = (key: string, data: any) => {
    return ipcStore.invoke("saveDbData", { key, data });
  };

  const getFromDb = async (key: string) => {
    const data = await ipcStore.invoke("getDbData", key);
    return data;
  };

  const removeFromDb = (key: string) => {
    return ipcStore.invoke("deleteDbData", key);
  };

  return {
    afterCreate,
    saveToDb,
    getFromDb,
    removeFromDb,
  };
});

export const localDbStore = LocalDbStore.create({});
