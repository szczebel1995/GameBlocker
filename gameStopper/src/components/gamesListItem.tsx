import * as React from "react";
import { ILauncherStore } from "../stores/objects/launcherStore";
import { IGameStore } from "../stores/objects/gameStore";
import { ColorE } from "../enums/color";

export interface IGamesListItemProps {
  item?: ILauncherStore | IGameStore;
  onClick: () => any;
  title?: string;
  focused?: boolean;
}

export const GamesListItem = (props: IGamesListItemProps) => {
  const isLauncherOrSeparator = props.title || (props.item as any).gamesMap;
  return (
    <div
      className="gamesListItem"
      onClick={props.onClick}
      style={{
        cursor: "pointer",
        padding: 10,
        // borderBottom: isLauncherOrSeparator
        //   ? `1px solid ${ColorE.LIST_BORDER_COLOR}`
        //   : undefined,
        // borderTop: isLauncherOrSeparator
        //   ? `1px solid ${ColorE.LIST_BORDER_COLOR}`
        //   : undefined,
        color: ColorE.TEXT_COLOR,
        backgroundColor: props.focused
          ? ColorE.LIST_ITEM_FOCUSED_BGD
          : isLauncherOrSeparator
          ? ColorE.LIST_ITEM_SEPARATOR_BGD
          : ColorE.LIST_BGD,
        fontWeight: isLauncherOrSeparator ? "bold" : undefined,
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
