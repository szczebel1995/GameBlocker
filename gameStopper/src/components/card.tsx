import * as React from "react";
import { ColorE } from "../enums/color";

export interface ICardProps {
  children?: any;
  style?: any;
  padding?: number;
  border?: boolean;
}

export const Card = (props: ICardProps) => {
  return (
    <div
      style={
        props.style
          ? props.style
          : {
              width: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: ColorE.LIST_BGD,
            }
      }
    >
      {props.children}
    </div>
  );
};
