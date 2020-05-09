import * as React from "react";
import { styled } from "../themes";
import { StyledButton } from "./button";

export interface IButtonProps {
  on: boolean;
  title: string;
  onClick: () => any;
}

const StyledToggleButton = styled(StyledButton)<IButtonProps>`
  background-color: ${(props) =>
    props.on
      ? props.theme.colors.secondary.normal
      : props.theme.colors.primary.normal};
  border-color: ${(props) =>
    props.on ? props.theme.colors.secondary.normal : "transparent"};
`;

const Title = styled.div`
  margin-top: -2px;
`;

export const ToggleButton = (props: IButtonProps) => {
  return (
    <StyledToggleButton {...props}>
      <Title>{props.title}</Title>
    </StyledToggleButton>
  );
};
