import { observer } from "mobx-react";
import * as React from "react";
import { LogoWithName } from "../../components/dumb/logoWithName";
import { GamesList } from "../../components/smart/gamesList";
import { HamburgerMenu } from "../../components/smart/hamburgerMenu";
import { HeaderRight } from "../../components/smart/headerRight";
import { MainViewRightCard } from "../../components/smart/mainViewRightCard";
import { styled } from "../../themes";

const MainViewWrapper = styled.main`
  background-color: ${(props) => props.theme.colors.primary.normal};
  padding: 20px;
  height: 100vh;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: 60px minmax(0, 1fr);
  grid-row-gap: 20px;
  column-gap: 20px;
`;

@observer
export class MainView extends React.Component {
  render() {
    const pageWrapId = "page-wrap";
    const outerContainerId = "outer-container";

    return (
      <div id={outerContainerId}>
        <HamburgerMenu
          pageWrapId={pageWrapId}
          outerContainerId={outerContainerId}
        />

        <MainViewWrapper id={pageWrapId}>
          <LogoWithName />
          <HeaderRight />
          <GamesList />
          <MainViewRightCard />
        </MainViewWrapper>
      </div>
    );
  }
}
