import { types } from "mobx-state-tree";
import { GameStore, IGameStore } from "./gameStore";

export type ILauncherStore = typeof LauncherStore.Type;
export const LauncherStore = types
  .model("LauncherStore", {
    id: types.identifier,
    name: types.string,
    paths: types.array(types.string),
    gamesMap: types.map(types.reference(GameStore)),
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

    const setIcon = (icon?: string) => {
      self.icon = icon;
    };

    const addGame = (game: IGameStore) => {
      self.gamesMap.put(game);
    };

    const removeGame = (id: string) => {
      self.gamesMap.delete(id);
    };

    return {
      setName,
      addPath,
      removePath,
      setIcon,
      removeGame,
      addGame,
    };
  });
