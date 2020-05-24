import * as React from "react";
import { IGameStore } from "../../../stores/objects/gameStore";
import { ILauncherStore } from "../../../stores/objects/launcherStore";
import { styled, Theme } from "../../../themes";
import { isLauncher } from "../../../utils/types";

export interface IGamesListItemProps {
  item?: ILauncherStore | IGameStore;
  onClick?: () => any;
  title?: string;
  focused?: boolean;
}

const getBackgroundColor = (props: IGamesListItemProps & { theme: Theme }) => {
  const { colors } = props.theme;
  const isSeparator = props.title || isLauncher(props.item);
  const isFocused = props.focused;

  if (isFocused) {
    return colors.secondary.bright;
  } else if (isSeparator) {
    return colors.secondary.dim;
  } else {
    return colors.primary.dim;
  }
};

const StyledGamesListItem = styled.div<IGamesListItemProps>`
  cursor: pointer;
  padding: 10px;
  color: ${(props) => props.theme.colors.secondary.text};
  background-color: ${(props) => getBackgroundColor(props)};
  font-weight: ${(props) =>
    props.title || isLauncher(props.item) ? "bold" : undefined};
  text-align: ${(props) =>
    props.title || isLauncher(props.item) ? "center" : null};
  :hover {
    background-color: ${(props) => props.theme.colors.secondary.bright};
  }
`;

export const GamesListItem = (props: IGamesListItemProps) => {
  return (
    <StyledGamesListItem {...props}>
      {props.item ? props.item.name : props.title}
    </StyledGamesListItem>
  );
};
