import * as React from "react";
import { FaTimes } from "react-icons/fa";

export interface IBlockedFileListItemProps {
  path: string;
}

export const BlockedFileListItem = (props: IBlockedFileListItemProps) => {
  return (
    <div
      className={"blockedFileListItem"}
      style={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 10px",
        opacity: 0.75,
      }}
    >
      <div>{props.path.split("/")[props.path.split("/").length - 1]}</div>
      <div>
        <FaTimes style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
};
