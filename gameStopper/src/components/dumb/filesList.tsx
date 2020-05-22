import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import { ScrollbarThumb } from "./scrollbarThumb";
import { BlockedFileListItem } from "./blockedFileListItem";
import { FaPlus } from "react-icons/fa";
import { ColorE } from "../../enums/color";

export interface IFilesListProps {
  filesPaths: string[];
  listTitle: string;
  height?: number | string;
  onFileAdded: (path: string) => any;
}

export const FilesList = (props: IFilesListProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: props.height ? props.height : "100%",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: 18,
          // padding: 10,
          fontWeight: "bold",
          color: ColorE.TEXT_COLOR,
        }}
      >
        {props.listTitle}
      </div>
      <div
        style={{
          height: props.height ? props.height : "100%",
          margin: "10px 0px",
        }}
      >
        <Scrollbars
          autoHide={false}
          renderThumbVertical={() => <ScrollbarThumb />}
        >
          <div
            style={{
              color: ColorE.TEXT_COLOR,
              padding: "0px 10px 0px 0px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {props.filesPaths.map((path) => (
              <BlockedFileListItem path={path} />
            ))}
          </div>
        </Scrollbars>
      </div>
      <label
        className="blockedFileAddButton"
        style={{
          textAlign: "center",
          cursor: "pointer",
          padding: 10,
          backgroundColor: ColorE.LIST_ITEM_BGD,
        }}
      >
        <input
          hidden
          type="file"
          onChange={(e) => {
            const filePath = e.target.files?.item(0)?.path;
            if (filePath) {
              console.log(filePath);
            }
          }}
        />
        <FaPlus />
      </label>
    </div>
  );
};
