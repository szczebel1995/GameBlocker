import * as React from "react";
import { ColorE } from "../enums/color";

export interface ICardHeaderProps {
  title: string;
  buttonLeft?: any;
  buttonRight?: any;
}

export const CardHeader = (props: ICardHeaderProps) => {
  return (
    <div
      style={{
        color: ColorE.TEXT_COLOR,
        // marginTop: -2,
        // marginLeft: -2,
        // marginRight: -2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 15px",
        backgroundColor: ColorE.LIST_ITEM_ACTIVE_BGD,
        fontWeight: "bold",
        fontSize: 20,
      }}
    >
      <div>{props.buttonLeft ? props.buttonLeft : <div />}</div>
      <div>{props.title}</div>
      <div style={{ alignSelf: "flex-end" }}>
        {props.buttonRight ? props.buttonRight : <div />}
      </div>
    </div>
  );
};
