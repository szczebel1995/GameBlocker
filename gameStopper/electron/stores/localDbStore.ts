import { types } from "mobx-state-tree";
const Storage = require("electron-store");

export const LocalDbStore = types
  .model({})
  .volatile((self) => {
    const storage = new Storage();
    return {
      storage,
    };
  })
  .actions((self) => {
    const afterCreate = async () => {
      // self.storage.clear();
    };

    const saveToDb = (key: string, data: any) => {
      return self.storage.set(key, data);
    };

    const getFromDb = (key: string) => {
      return self.storage.get(key);
    };

    const removeFromDb = (key: string) => {
      return self.storage.delete(key);
    };

    const clearDb = () => {
      return self.storage.clear();
    };

    return {
      afterCreate,
      saveToDb,
      getFromDb,
      removeFromDb,
      clearDb,
    };
  });

export const localDbStore = LocalDbStore.create({});
