import * as React from "react";
import { styled } from "../../themes";

export interface IButtonGroupProps {
  children?: any;
}

const StyledButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => React.Children.count(props.children)},
    minmax(10px, auto)
  );
  grid-column-gap: 10px;
`;

export const ButtonGroup = (props: IButtonGroupProps) => {
  return <StyledButtonGroup>{props.children}</StyledButtonGroup>;
};
