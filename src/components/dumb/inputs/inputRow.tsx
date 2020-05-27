import * as React from "react";
import { styled } from "../../../themes";

export interface IInputRowProps {
  label: string;
  input: any;
  column?: boolean;
  flex?: boolean;
}

const StyledInputRowItem = styled.div<{ column?: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.column ? undefined : "minmax(0, 1fr) minmax(0, 1fr)"};
  align-items: center;
  color: ${(props) => props.theme.colors.primary.text};
  box-sizing: border-box;
`;

const ColumnWrapper = styled.div<{ side: "left" | "right"; flex?: boolean }>`
  width: 100%;
  display: ${(props) => (props.flex ? "flex" : undefined)};
  justify-content: ${(props) =>
    props.side === "left" ? "flex-start" : "flex-end"};
`;

export const InputRow = (props: IInputRowProps) => {
  return (
    <StyledInputRowItem column={props.column}>
      <ColumnWrapper flex={props.flex} side={"left"}>
        {props.label}
      </ColumnWrapper>
      <ColumnWrapper flex={props.flex} side={"right"}>
        {props.input}
      </ColumnWrapper>
    </StyledInputRowItem>
  );
};
