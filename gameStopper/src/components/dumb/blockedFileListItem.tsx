import * as React from "react";
import { FaTimes } from "react-icons/fa";
import { styled } from "../../themes";

const ListItem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 5px 10px; */
  opacity: 0.75;
  :hover {
    opacity: 1;
    background-color: ${(props) => props.theme.colors.secondary.bright};
  }
`;

export interface IBlockedFileListItemProps {
  path: string;
}

export const BlockedFileListItem = (props: IBlockedFileListItemProps) => {
  const fileName = props.path.split("/")[props.path.split("/").length - 1];

  return (
    <ListItem>
      {fileName}
      <FaTimes />
    </ListItem>
  );
};
