import * as React from "react";

export interface ICardHeaderProps {
  title: string;
  buttonLeft?: any;
  buttonRight?: any;
}

export const CardHeader = (props: ICardHeaderProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 10px",
        backgroundColor: "red",
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
