import * as React from "react";
import { observer } from "mobx-react";
import { Header } from "../components/header";
import { GamesList } from "../components/gamesList";
import { Card } from "../components/card";
import logo from "../assets/img/logo.png";
import { mainViewStore } from "../stores/ui/mainViewStore";
import { EditCard } from "../components/editCard";
import Toggle from "react-toggle";
import { AddCard } from "../components/addCard";
import { ColorE } from "../enums/color";
import { InputRowItem } from "../components/inputRowItem";
import {
  GiMagicPotion,
  GiHealthPotion,
  GiPotionBall,
  GiBroadsword,
} from "react-icons/gi";
import { HamburgerMenu } from "../components/hamburgerMenu";

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
            <EditCard editedItem={mainViewStore.focusedItem as any} />
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
