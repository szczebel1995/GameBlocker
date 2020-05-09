import * as React from "react";
import { ColorE } from "../enums/color";
import { styled } from "../themes";
import { css } from "@emotion/core";

export interface IButtonProps {
  title: string;
  onClick: () => any;
}

export const StyledButton = styled.button<IButtonProps>`
  font-weight: bold;
  color: ${(props) => props.theme.colors.secondary.text};
  padding: 10px;
  background-color: ${(props) => props.theme.colors.secondary.normal};
  border: ${(props) => `2px solid ${props.theme.colors.secondary.normal}`};
  outline: none;
  :hover {
    background-color: ${(props) => props.theme.colors.secondary.bright};
    border-color: ${(props) => props.theme.colors.secondary.bright};
  }
`;

export const Button = (props: IButtonProps) => {
  return (
    <StyledButton {...props}>
      <div style={{ marginTop: -2 }}>{props.title}</div>
    </StyledButton>
  );
};
