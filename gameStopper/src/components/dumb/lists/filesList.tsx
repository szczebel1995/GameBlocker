import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import { ScrollbarThumb } from "../scrollbarThumb";
import { FileListItem } from "./fileListItem";
import { FaPlus } from "react-icons/fa";
import { FileInput } from "../inputs/fileInput";
import { styled } from "../../../themes";
import { Status } from "../status";
import { observer } from "mobx-react";

export interface IFilesListProps {
  filesPaths: string[];
  listTitle: string;
  height?: number | string;
  onFileAdded: (path: string) => any;
  onFileRemoved: (path: string) => any;
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

@observer
export class FilesList extends React.Component<IFilesListProps> {
  render() {
    const {
      filesPaths,
      height,
      listTitle,
      onFileAdded,
      onFileRemoved,
    } = this.props;
    const listIsEmpty = filesPaths.length <= 0;
    return (
      <StyledFilesList height={height}>
        <ListTitle>{listTitle}</ListTitle>
        <ListWrapper height={height}>
          {listIsEmpty ? (
            <Status message={"No blocked files"} />
          ) : (
            <Scrollbars
              autoHide={false}
              renderThumbVertical={() => <ScrollbarThumb />}
            >
              <ListContentWrapper>
                {filesPaths.map((path, i) => (
                  <FileListItem
                    key={`${path}${i}`}
                    path={path}
                    onRemove={() => onFileRemoved(path)}
                  />
                ))}
              </ListContentWrapper>
            </Scrollbars>
          )}
        </ListWrapper>
        <FileInput
          icon={<FaPlus />}
          onFileChosen={(path) => onFileAdded(path)}
        />
      </StyledFilesList>
    );
  }
}
