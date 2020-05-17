import * as React from "react";
import { ColorE } from "../../enums/color";
import { styled } from "../../themes";

export interface IInputRowItemProps {
  label: string;
  input: any;
  column?: boolean;
}

const StyledInputRowItem = styled.div<IInputRowItemProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.column ? undefined : "minmax(0, 1fr) minmax(0, 1fr)"};
  align-items: center;
  padding: 5px 10px;
  color: ${(props) => props.theme.colors.primary.text};
  box-sizing: border-box;
`;

const ColumnWrapper = styled.div<{ side: "left" | "right" }>`
  width: "100%";
  align-self: ${(props) => (props.side === "left" ? "start" : "end")};
`;

export const InputRowItem = (props: IInputRowItemProps) => {
  return (
    <StyledInputRowItem {...props}>
      <ColumnWrapper side={"left"}>{props.label}</ColumnWrapper>
      <ColumnWrapper side={"right"}>{props.input}</ColumnWrapper>
    </StyledInputRowItem>
  );
};
