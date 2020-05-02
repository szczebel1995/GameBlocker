import * as React from "react";
import { ILauncherStore } from "../stores/objects/launcherStore";
import { IGameStore } from "../stores/objects/gameStore";
import { ColorE } from "../enums/color";

export interface IGamesListItemProps {
  item?: ILauncherStore | IGameStore;
  onClick: () => any;
  title?: string;
}

export const GamesListItem = (props: IGamesListItemProps) => {
  const isLauncherOrSeparator = props.title || (props.item as any).gamesMap;
  return (
    <div
      onClick={props.onClick}
      style={{
        padding: 10,
        // borderBottom: isLauncherOrSeparator
        //   ? `1px solid ${ColorE.LIST_BORDER_COLOR}`
        //   : undefined,
        // borderTop: isLauncherOrSeparator
        //   ? `1px solid ${ColorE.LIST_BORDER_COLOR}`
        //   : undefined,
        color: ColorE.TEXT_COLOR,
        backgroundColor: isLauncherOrSeparator
          ? ColorE.LIST_ITEM_SEPARATOR_BGD
          : ColorE.LIST_BGD,
      }}
    >
      {props.item ? (
        <div>
          <div>{props.item.icon}</div>
          <div>{props.item.name}</div>
        </div>
      ) : (
        <div>{props.title}</div>
      )}
    </div>
  );
};
