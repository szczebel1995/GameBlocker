import * as React from "react";
import { styled, Theme } from "../../../themes";
import { StyledButton } from "./button";
import { css } from "@emotion/core";

export interface IButtonProps {
  toggledOn: boolean;
  title: string;
  onClick: () => any;
}

const selectedStyle = ({ colors }: Theme) => css`
  background-color: ${colors.secondary.normal};
  border-color: ${colors.secondary.normal};
`;

const notSelectedStyle = ({ colors }: Theme) => css`
  background-color: ${colors.primary.normal};
  border-color: transparent;
`;

const StyledToggleButton = styled(StyledButton)<IButtonProps>`
  ${(props) =>
    props.toggledOn
      ? selectedStyle(props.theme)
      : notSelectedStyle(props.theme)}
`;

export const ToggleButton = (props: IButtonProps) => {
  return <StyledToggleButton {...props}>{props.title}</StyledToggleButton>;
};
