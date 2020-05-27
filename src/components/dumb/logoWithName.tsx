import * as React from "react";
import logo from "../../assets/img/logo.png";
import { styled } from "../../themes";

const StyledLogoWithName = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: ${(props) => props.theme.colors.primary.text};
`;

const Logo = styled.img`
  height: 50px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Name = styled.div`
  padding-left: 10px;
  padding-right: 7px;
  font-size: 22px;
  font-weight: bold;
`;

const Version = styled.div`
  opacity: 0.4;
  font-size: 16px;
  padding-bottom: 2px;
`;

export const LogoWithName = () => {
  return (
    <StyledLogoWithName>
      <Logo src={logo} alt="logo" />
      <NameWrapper>
        <Name>GameBlocker</Name>
        <Version>alpha</Version>
      </NameWrapper>
    </StyledLogoWithName>
  );
};
