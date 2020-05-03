import * as React from "react";
import { ColorE } from "../enums/color";

export interface IInputRowItemProps {
  label: string;
  input: any;
}

export const InputRowItem = (props: IInputRowItemProps) => {
  return (
    <div
      style={{
        textAlign: "start",
        color: ColorE.TEXT_COLOR,
        boxSizing: "border-box",
        // display: "flex",
        // justifyContent: "space-between",
        // alignItems: "center",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
        justifyItems: "start",
        alignItems: "center",
        padding: "5px 10px",
      }}
    >
      <div style={{ width: "100%" }}>{props.label}</div>
      <div style={{ width: "100%" }}>{props.input}</div>
    </div>
  );
};
