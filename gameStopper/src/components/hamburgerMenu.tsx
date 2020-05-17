import * as React from "react";
import { observer } from "mobx-react";
import { push as Menu } from "react-burger-menu";
import { InputRowItem } from "./inputRowItem";
import Toggle from "react-toggle";
import { styled } from "../themes";
import { mainViewStore } from "../views/mainView/mainViewStore";

export interface IHamburgerMenuProps {}

const MenuContentWrapper = styled.div`
  height: 100%;
  /* display: flex !important; */
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.secondary.normal};
  color: ${(props) => props.theme.colors.secondary.text};
  padding: 10px;
  padding-bottom: 20px;
  box-sizing: border-box;
  align-items: center;
  & > a {
    color: ${(props) => props.theme.colors.secondary.text};
  }
`;

const MenuFooter = styled.div`
  opacity: 0.8;
  font-size: 14;
`;

@observer
export class HamburgerMenu extends React.Component<IHamburgerMenuProps> {
  render() {
    return (
      <Menu
        styles={{ bmBurgerButton: { display: "none" } }}
        isOpen={mainViewStore.settingsOpened}
        right
        onStateChange={({ isOpen }) =>
          !isOpen && mainViewStore.settingsOpened
            ? mainViewStore.toggleSettingsOpened(false)
            : undefined
        }
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
      >
        <MenuContentWrapper>
          <div>
            <div
              style={{ paddingBottom: 20, fontSize: 22, fontWeight: "bold" }}
            >
              Settings
            </div>
            <InputRowItem
              label={(<b>Launch at system startup:</b>) as any}
              input={<Toggle />}
            />
            <div style={{ height: 20 }}></div>
            <InputRowItem
              label={
                (
                  <div>
                    <div style={{ fontWeight: "bold" }}>Contact:</div>
                    <a /* style={{ color: ColorE.TEXT_COLOR }} */ href="">
                      contact@gameblocker.com
                    </a>
                  </div>
                ) as any
              }
              input={""}
            />
            <InputRowItem
              column
              label={
                (
                  <div>
                    <div style={{ fontWeight: "bold" }}>
                      Support this project:
                    </div>
                    <a /* style={{ color: ColorE.TEXT_COLOR }} */ href="">
                      paypal.me
                    </a>
                  </div>
                ) as any
              }
              input={""}
            />
          </div>
          <MenuFooter style={{ opacity: 0.8, fontSize: 14 }}>
            2020 © GameStopper
          </MenuFooter>
        </MenuContentWrapper>
      </Menu>
    );
  }
}
