import * as React from "react";
import { ILauncherStore } from "../stores/objects/launcherStore";
import { IGameStore } from "../stores/objects/gameStore";
import { ColorE } from "../enums/color";
import { styled } from "../themes";
import { isLauncher } from "../utils/types";

export interface IGamesListItemProps {
  item?: ILauncherStore | IGameStore;
  onClick?: () => any;
  title?: string;
  focused?: boolean;
}

const StyledGamesListItem = styled.div<IGamesListItemProps>`
  cursor: "pointer";
  padding: 10;
  color: ${(props) => props.theme.colors.secondary.text};
  background-color: ${(props) =>
    props.focused
      ? props.theme.colors.secondary.bright
      : props.title || isLauncher(props.item)
      ? props.theme.colors.secondary.normal
      : props.theme.colors.primary.normal};
  font-weight: ${(props) =>
    props.title || isLauncher(props.item) ? "bold" : undefined};
  :hover {
    background-color: ${(props) => props.theme.colors.secondary.bright};
  }
`;

export const GamesListItem = (props: IGamesListItemProps) => {
  return (
    <StyledGamesListItem {...props}>
      <div>{props.item ? props.item.name : props.title}</div>
    </StyledGamesListItem>
  );
};
