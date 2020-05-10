import * as React from "react";
import { ColorE } from "../enums/color";
import { styled, themes } from "../themes";
import { css } from "@emotion/core";

export interface ICardProps {
  style?: any;
  children?: any;
}

const StyledCard = styled.div<ICardProps>`
  ${(props) => (props.style ? props.style : defaultStyle)}
`;

const defaultStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${themes.dark.colors.primary.dim};
`;

export const Card = (props: ICardProps) => {
  return <StyledCard {...props}>{props.children}</StyledCard>;
};
