import { types } from "mobx-state-tree";

export type IGameStore = typeof GameStore.Type;
export const GameStore = types
  .model({
    id: types.identifier,
    name: types.string,
    paths: types.array(types.string),
    launcher: types.maybe(types.string),
    icon: types.maybe(types.string),
  })
  .actions((self) => {
    const setName = (name: string) => {
      self.name = name;
    };

    return {
      setName,
    };
  });
