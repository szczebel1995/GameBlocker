import * as React from "react";
import { styled } from "../../../themes";

export interface ICardProps {
  transparent?: boolean;
  children?: any;
}

const StyledCard = styled.div<ICardProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.transparent ? "transparent" : props.theme.colors.primary.dim};
`;

export const Card = (props: ICardProps) => {
  return <StyledCard {...props}>{props.children}</StyledCard>;
};
