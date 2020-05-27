import * as React from "react";
import { styled } from "../../../themes";

export interface IButtonGroupProps {
  columnGap?: number;
  children?: any;
}

const StyledButtonGroup = styled.div<IButtonGroupProps>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => React.Children.count(props.children)},
    minmax(10px, max-content)
  );
  grid-column-gap: ${(props) =>
    props.columnGap ? `${props.columnGap}px` : "10px"};
  align-items: center;
`;

export const ButtonGroup = (props: IButtonGroupProps) => {
  return (
    <StyledButtonGroup columnGap={props.columnGap}>
      {props.children}
    </StyledButtonGroup>
  );
};
