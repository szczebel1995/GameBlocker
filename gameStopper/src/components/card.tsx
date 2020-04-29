import * as React from "react";

export interface ICardProps {
  children?: any;
  style?: any;
  padding?: number;
  border?: boolean;
}

export const Card = (props: ICardProps) => {
  return <div style={props.style}>{props.children}</div>;
};
