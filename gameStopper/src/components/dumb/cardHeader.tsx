import * as React from "react";
import { ColorE } from "../../enums/color";
import { styled } from "../../themes";

export interface ICardHeaderProps {
  title: string;
  buttonLeft?: any;
  buttonRight?: any;
}

const StyledCardHeader = styled.div`
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
        {props.buttonLeft ? props.buttonLeft : null}
      </BtnWrap>
      <div>{props.title}</div>
      <BtnWrap side={"right"}>
        {props.buttonRight ? props.buttonRight : null}
      </BtnWrap>
    </StyledCardHeader>
  );
};
