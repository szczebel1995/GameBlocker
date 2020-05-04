import { types } from "mobx-state-tree";
import { GameStore, IGameStore } from "../objects/gameStore";
import { LauncherStore, ILauncherStore } from "../objects/launcherStore";
import { gamesStore } from "../gamesStore";

export type IMainViewStore = typeof MainViewStore.Type;
export const MainViewStore = types
  .model({
    currentRightCard: types.maybe(types.enumeration(["add", "edit"])),
    focusedGamesListItem: types.maybe(types.string),
    focusedGamesListItemType: types.maybe(
      types.enumeration(["launcher", "game"])
    ),
    settingsOpened: types.optional(types.boolean, false),
    searchGameValue: types.maybe(types.string),
    searchOpened: types.optional(types.boolean, false),
    gamesListRerender: types.optional(types.number, 0),
  })
  .views((self) => ({
    get focusedItem() {
      if (self.focusedGamesListItem) {
        return self.focusedGamesListItemType === "launcher"
          ? gamesStore.launchersMap.get(self.focusedGamesListItem)
          : gamesStore.gamesMap.get(self.focusedGamesListItem);
      }
    },
  }))
  .actions((self) => {
    const focusGamesListItem = (item?: IGameStore | ILauncherStore) => {
      self.focusedGamesListItem = item ? (item?.id as any) : undefined;
      self.focusedGamesListItemType = item
        ? (item as any).gamesMap
          ? "launcher"
          : "game"
        : undefined;
      self.currentRightCard = self.focusedGamesListItem ? "edit" : undefined;
    };

    const toggleSettingsOpened = (on?: boolean) => {
      self.settingsOpened = on !== undefined ? on : !self.settingsOpened;
    };

    const toggleAddCardOpened = (on: boolean) => {
      // self.addCardOpened = on !== undefined ? on : !self.addCardOpened;
      self.currentRightCard = on ? "add" : undefined;
    };

    const toggleSearch = (on?: boolean) => {
      self.searchOpened = on !== undefined ? on : !self.settingsOpened;
    };

    const updateSearchValue = (search: string) => {
      self.searchGameValue = search;
    };

    const forceGamesListRerender = () => {
      self.gamesListRerender = Math.random();
    };

    return {
      toggleSettingsOpened,
      focusGamesListItem,
      toggleAddCardOpened,
      toggleSearch,
      updateSearchValue,
      forceGamesListRerender,
    };
  });

export const mainViewStore = MainViewStore.create({});
