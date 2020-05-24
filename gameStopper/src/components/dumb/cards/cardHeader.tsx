import * as React from "react";
import { styled } from "../../../themes";
import { Clickable } from "../buttons/clickable";

export interface ICardHeaderProps {
  title: string;
  buttonLeft?: any;
  buttonRight?: any;
}

const StyledCardHeader = styled.div`
  color: white;
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  justify-items: center;
  align-items: center;
  padding: 10px 15px;
  background-color: ${(props) => props.theme.colors.secondary.normal};
  font-weight: bold;
  font-size: 20px;
`;

const BtnWrap = styled.div<{ side: "left" | "right" }>`
  justify-self: ${(props) => (props.side === "left" ? "start" : "end")};
`;

export const CardHeader = (props: ICardHeaderProps) => {
  return (
    <StyledCardHeader>
      <BtnWrap side={"left"}>
        <Clickable>{props.buttonLeft ? props.buttonLeft : null}</Clickable>
      </BtnWrap>
      <div>{props.title}</div>
      <BtnWrap side={"right"}>
        <Clickable>{props.buttonRight ? props.buttonRight : null}</Clickable>
      </BtnWrap>
    </StyledCardHeader>
  );
};
