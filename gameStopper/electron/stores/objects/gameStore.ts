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

    const addPath = (path: string) => {
      self.paths.push(path);
    };

    const removePath = (path: string) => {
      self.paths.remove(path);
    };

    const setLauncher = (id?: string) => {
      self.launcher = id;
    };

    const setIcon = (icon?: string) => {
      self.icon = icon;
    };

    return {
      setName,
      addPath,
      removePath,
      setLauncher,
      setIcon,
    };
  });
