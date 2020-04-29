import * as React from "react";
import { ILauncherStore } from "../stores/objects/launcherStore";
import { IGameStore } from "../stores/objects/gameStore";

export interface IGamesListItemProps {
  item: ILauncherStore | IGameStore;
  onClick: () => any;
}

export const GamesListItem = (props: IGamesListItemProps) => {
  const { icon, name } = props.item;
  return (
    <div
      onClick={props.onClick}
      style={{
        backgroundColor: (props.item as any).gamesMap ? "white" : "gray",
      }}
    >
      <div>{props.item.icon}</div>
      <div>{props.item.name}</div>
    </div>
  );
};
