import * as React from "react";
import { ColorE } from "../enums/color";

export interface IButtonProps {
  toggled?: boolean;
  title: string;
  onClick: () => any;
}

export const Button = (props: IButtonProps) => {
  return (
    <button
      className="button"
      onClick={props.onClick}
      style={{
        fontWeight: "bold",
        color: ColorE.TEXT_COLOR,
        backgroundColor:
          props.toggled === false
            ? ColorE.LIST_ITEM_BGD
            : ColorE.LIST_ITEM_ACTIVE_BGD,
        border: `2px solid ${
          props.toggled === false ? "transparent" : ColorE.LIST_ITEM_ACTIVE_BGD
        }`,
        padding: 10,
      }}
    >
      <div style={{ marginTop: -2 }}>{props.title}</div>
    </button>
  );
};
