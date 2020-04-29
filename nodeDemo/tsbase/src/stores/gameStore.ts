import { types } from "mobx-state-tree";

export type IGameStore = typeof GameStore.Type;
export const GameStore = types
  .model({
    name: types.string,
    paths: types.array(types.string),
  })
  .actions((self) => {
    const setName = (name: string) => {
      self.name = name;
    };

    return {
      setName,
    };
  });
