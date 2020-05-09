import { types } from "mobx-state-tree";

export type IGameStore = typeof GameStore.Type;
export const GameStore = types
  .model({
    id: types.string,
    name: types.string,
    paths: types.array(types.string),
  })
  .actions((self) => {
    const setName = (name: string) => {
      self.name = name;
    };

    const addPath = (path: string) => {
      self.paths.push(path);
    };

    const removePath = (path: string) => {
      self.paths.remove(path);
    };

    return {
      setName,
    };
  });
