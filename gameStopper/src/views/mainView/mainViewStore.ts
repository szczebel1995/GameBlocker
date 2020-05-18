import { types } from "mobx-state-tree";
import { isLauncher } from "../../utils/types";
import { GameStore, IGameStore } from "../../stores/objects/gameStore";
import {
  LauncherStore,
  ILauncherStore,
} from "../../stores/objects/launcherStore";

export type IMainViewStore = typeof MainViewStore.Type;
export const MainViewStore = types
  .model({
    currentRightCard: types.maybe(types.enumeration(["add", "edit"])),
    focusedGamesListItem: types.maybe(
      types.reference(GameStore || LauncherStore)
    ),
    settingsOpened: types.optional(types.boolean, false),
    searchGameValue: types.maybe(types.string),
    searchOpened: types.optional(types.boolean, false),
    gamesListRerender: types.optional(types.number, 0),
  })
  .views((self) => ({
    get focusedGamesListItemType() {
      if (self.focusedGamesListItem) {
        return isLauncher(self.focusedGamesListItem) ? "launcher" : "game";
      }
    },
  }))
  .actions((self) => {
    const focusGamesListItem = (item?: IGameStore | ILauncherStore) => {
      self.focusedGamesListItem = item as any;
      self.currentRightCard = item ? "edit" : undefined;
    };

    const toggleSettingsOpened = (on?: boolean) => {
      self.settingsOpened = on !== undefined ? on : !self.settingsOpened;
    };

    const toggleAddCardOpened = (on: boolean) => {
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

export const mainViewStore = MainViewStore.create({ currentRightCard: "add" });
