import * as React from "react";
import { observer } from "mobx-react";
import { Header } from "../../components/smart/header";
import { GamesList } from "../../components/smart/gamesList";
import { Card } from "../../components/dumb/card";
import logo from "../../assets/img/logo.png";
import { mainViewStore } from "./mainViewStore";
import { EditCard } from "../../components/smart/editCard";
import { AddCard } from "../../components/smart/addCard";
import { ColorE } from "../../enums/color";
import { HamburgerMenu } from "../../components/smart/hamburgerMenu";

@observer
export class MainView extends React.Component {
  render() {
    const style = {
      menuRowStyle: { display: "flex", justifyContent: "space-between" },
    };

    return (
      <div id="outer-container">
        <HamburgerMenu />
        <div
          id="page-wrap"
          // id="outer-container"
          style={{
            backgroundColor: ColorE.MAIN_BGD,
            padding: 20,
            height: "100vh",
            boxSizing: "border-box",

            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gridTemplateRows: "60px minmax(0, 1fr)",
            gridRowGap: 20,
            columnGap: 20,
          }}
        >
          <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
            <Header />
          </div>
          <GamesList />
          {mainViewStore.currentRightCard === "edit" ? (
            <EditCard editedItem={mainViewStore.focusedGamesListItem as any} />
          ) : mainViewStore.currentRightCard === "add" ? (
            <AddCard />
          ) : (
            <Card style={{}}>
              <div
                className="flexCenter"
                style={{ width: "100%", height: "100%" }}
              >
                <img
                  style={{ opacity: 0.5, height: "40%" }}
                  src={logo}
                  alt="logo"
                />
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }
}
