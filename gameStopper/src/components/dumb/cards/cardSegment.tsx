import * as React from "react";
import { styled } from "../../../themes";

export interface ICardSegmentProps extends React.Props<HTMLDivElement> {
  height?: string | number;
}

const StyledCardSegment = styled.div<ICardSegmentProps>`
  padding: 10px 15px;
  height: ${(props) => (props.height ? props.height : undefined)};
  display: grid;
  grid-template-rows: repeat(
    ${(props) => React.Children.count(props.children)},
    minmax(10px, auto)
  );
  grid-row-gap: 10px;
`;

export const CardSegment = (props: ICardSegmentProps) => {
  return (
    <StyledCardSegment height={props.height}>
      {props.children}
    </StyledCardSegment>
  );
};
