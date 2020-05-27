import { css } from "@emotion/core";
import * as React from "react";
import { styled, Theme } from "../../../themes";

export interface IButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, "type"> {
  title: any;
  onClick: () => any;
  primary?: boolean;
  secondary?: boolean;
}

const primaryStyles = ({ colors }: Theme) => css`
  color: ${colors.secondary.text};
  background-color: ${colors.primary.normal};
  border: 2px solid ${colors.primary.normal};
  &:hover {
    background-color: ${colors.primary.bright};
    border-color: ${colors.primary.bright};
  }
`;

const secondaryStyles = ({ colors }: Theme) => css`
  color: ${colors.secondary.text};
  background-color: ${colors.secondary.normal};
  border: 2px solid ${colors.secondary.normal};
  &:hover {
    background-color: ${colors.secondary.bright};
    border-color: ${colors.secondary.bright};
  }
`;

export const StyledButton = styled.button<IButtonProps>`
  ${(props) =>
    props.primary ? primaryStyles(props.theme) : secondaryStyles(props.theme)}
  font-weight: bold;
  padding: 10px;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = (props: IButtonProps) => {
  return (
    <StyledButton {...props} title={undefined}>
      {props.title}
    </StyledButton>
  );
};
