import * as React from "react";

export interface IInputRowItemProps {
  label: string;
  input: any;
}

export const InputRowItem = (props: IInputRowItemProps) => {
  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        width: "100%",
      }}
    >
      <div>{props.label}</div>
      <div>{props.input}</div>
    </div>
  );
};
