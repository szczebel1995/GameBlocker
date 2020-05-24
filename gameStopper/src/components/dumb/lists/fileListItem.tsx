import * as React from "react";
import { FaTimes } from "react-icons/fa";
import { styled } from "../../../themes";

const ListItem = styled.div`
  cursor: pointer;
  display: flex;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.primary.text};
  opacity: 0.75;
  :hover {
    opacity: 1;
    background-color: ${(props) => props.theme.colors.secondary.bright};
  }
`;

export interface IFileListItemProps {
  path: string;
  onRemove: () => any;
}

export const FileListItem = (props: IFileListItemProps) => {
  const fileName = props.path.split("\\")[props.path.split("\\").length - 1];

  return (
    <ListItem>
      {fileName}
      <FaTimes onClick={props.onRemove} />
    </ListItem>
  );
};
