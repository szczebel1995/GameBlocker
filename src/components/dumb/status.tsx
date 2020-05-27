import * as React from "react";
import { styled } from "../../themes";

export interface IStatusProps {
  message?: string;
  icon?: any;
  bottomRow?: any;
}

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

export const Status = ({ icon, message, bottomRow }: IStatusProps) => {
  return (
    <StatusWrapper>
      {icon}
      {message && <StatusMessage>{message}</StatusMessage>}
      {bottomRow}
    </StatusWrapper>
  );
};
