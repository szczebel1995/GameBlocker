import * as React from "react";
import { styled } from "../../themes";

const StatusWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StatusMessage = styled.div`
  font-size: 16px;
  padding: 20px;
  opacity: 0.7;
  text-align: center;
`;

export const Status = ({
  icon,
  message,
  bottomRow,
}: {
  message: string;
  icon?: any;
  bottomRow?: any;
}) => {
  return (
    <StatusWrapper>
      {icon}
      <StatusMessage>{message}</StatusMessage>
      {bottomRow}
    </StatusWrapper>
  );
};
