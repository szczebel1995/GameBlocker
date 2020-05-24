import * as React from "react";
import { observer } from "mobx-react";
import { slide as Menu } from "react-burger-menu";
import { InputRow } from "../dumb/inputs/inputRow";
import Toggle from "react-toggle";
import { styled } from "../../themes";
import { mainViewStore } from "../../views/mainView/mainViewStore";
import { CardSegment } from "../dumb/cards/cardSegment";

export interface IHamburgerMenuProps {
  pageWrapId?: string;
  outerContainerId?: string;
}

const MenuContentWrapper = styled.div`
  height: 100%;
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.primary.bright};
  color: ${(props) => props.theme.colors.primary.text};
  box-sizing: border-box;
  align-items: center;
  outline: none;
  a {
    color: ${(props) => props.theme.colors.primary.text};
  }
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
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
        styles={{
          bmBurgerButton: { display: "none" },
        }}
        isOpen={mainViewStore.settingsOpened}
        right
        onStateChange={({ isOpen }) =>
          !isOpen && mainViewStore.settingsOpened
            ? mainViewStore.toggleSettingsOpened(false)
            : undefined
        }
        pageWrapId={this.props.pageWrapId}
        outerContainerId={this.props.outerContainerId}
      >
        <MenuContentWrapper>
          <div>
            <CardSegment>
              <Title>Settings</Title>
            </CardSegment>
            <CardSegment>
              <InputRow
                flex
                label={(<b>Launch at system startup:</b>) as any}
                input={<Toggle />}
              />
            </CardSegment>
            <CardSegment>
              <InputRow
                column
                label={(<b>Contact:</b>) as any}
                input={<a href="">contact@gameblocker.com</a>}
              />
              <InputRow
                column
                label={(<b>Support this project:</b>) as any}
                input={<a href="">paypal.me</a>}
              />
            </CardSegment>
          </div>
          <CardSegment>
            <MenuFooter>2020 © GameStopper</MenuFooter>
          </CardSegment>
        </MenuContentWrapper>
      </Menu>
    );
  }
}
