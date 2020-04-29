import { types } from "mobx-state-tree";
import { GameStore, IGameStore } from "../objects/gameStore";
import { LauncherStore, ILauncherStore } from "../objects/launcherStore";

export type IMainViewStore = typeof MainViewStore.Type;
export const MainViewStore = types
  .model({
    focusedGamesListItem: types.maybe(types.string),
    focusedGamesListItemType: types.maybe(
      types.enumeration(["launcher", "game"])
    ),
  })
  .actions((self) => {
    const focusGamesListItem = (item?: IGameStore | ILauncherStore) => {
      self.focusedGamesListItem = item ? (item?.name as any) : undefined;
      self.focusedGamesListItemType = item
        ? (item as any).gamesMap
          ? "launcher"
          : "game"
        : undefined;
    };
    return {
      focusGamesListItem,
    };
  });

export const mainViewStore = MainViewStore.create({
  focusedGamesListItem: "Might and Magic Heroes VI",
  focusedGamesListItemType: "game",
});
