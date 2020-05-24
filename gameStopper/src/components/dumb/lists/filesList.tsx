import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import { ScrollbarThumb } from "../scrollbarThumb";
import { FileListItem } from "./fileListItem";
import { FaPlus } from "react-icons/fa";
import { FileInput } from "../inputs/fileInput";
import { styled } from "../../../themes";
import { Status } from "../status";

export interface IFilesListProps {
  filesPaths: string[];
  listTitle: string;
  height?: number | string;
  onFileAdded: (path: string) => any;
}

const ListTitle = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary.text};
`;

const ListWrapper = styled.div<{ height?: number | string }>`
  height: ${(props) => (props.height ? props.height : "100%")};
  margin: 10px 0px;
`;

const ListContentWrapper = styled.div`
  padding-right: 10px;
`;

const StyledFilesList = styled.div<{ height?: number | string }>`
  display: flex;
  flex-direction: column;
  height: ${(props) => (props.height ? props.height : "100%")};
`;

export const FilesList = (props: IFilesListProps) => {
  const listIsEmpty = props.filesPaths.length <= 0;
  return (
    <StyledFilesList height={props.height}>
      <ListTitle>{props.listTitle}</ListTitle>
      <ListWrapper height={props.height}>
        {listIsEmpty ? (
          <Status message={"No blocked files"} />
        ) : (
          <Scrollbars
            autoHide={false}
            renderThumbVertical={() => <ScrollbarThumb />}
          >
            <ListContentWrapper>
              {props.filesPaths.map((path) => (
                <FileListItem path={path} />
              ))}
            </ListContentWrapper>
          </Scrollbars>
        )}
      </ListWrapper>
      <FileInput icon={<FaPlus />} onFileChosen={(path) => console.log(path)} />
    </StyledFilesList>
  );
};
