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
          padding: 10,
          fontWeight: "bold",
          color: ColorE.TEXT_COLOR,
        }}
      >
        {props.listTitle}
      </div>
      <div style={{ height: props.height ? props.height : "100%" }}>
        <Scrollbars
          autoHide={false}
          renderThumbVertical={() => <ScrollbarThumb />}
        >
          <div
            style={{
              color: ColorE.TEXT_COLOR,
              padding: 5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              {props.filesPaths.map((path) => (
                <BlockedFileListItem path={path} />
              ))}
            </div>
            <div
              className="blockedFileAddButton"
              style={{
                textAlign: "center",
                cursor: "pointer",
                margin: 10,
                padding: 10,
                backgroundColor: ColorE.LIST_ITEM_BGD,
              }}
            >
              <FaPlus />
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};
