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
  font-size: 18px;
  padding: 20px;
  opacity: 0.7;
`;

export const Status = ({
  icon,
  message,
  bottomRow,
}: {
  icon: any;
  message: string;
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
