import * as React from "react";
import { observer } from "mobx-react";
import { Header } from "../components/header";
import { GamesList } from "../components/gamesList";
import { Card } from "../components/card";
import logo from "../assets/img/logo.png";
import { mainViewStore } from "../stores/ui/mainViewStore";
import { EditCard } from "../components/editCard";
import { push as Menu } from "react-burger-menu";
import Toggle from "react-toggle";
import { AddCard } from "../components/addCard";
import { ColorE } from "../enums/color";

@observer
export class MainView extends React.Component {
  render() {
    const style = {
      menuRowStyle: { display: "flex", justifyContent: "space-between" },
    };

    return (
      <div
        id="outer-container"
        style={{ backgroundColor: ColorE.MAIN_BGD, padding: 25 }}
      >
        <Menu
          styles={{ bmBurgerButton: { display: "none" } }}
          isOpen={mainViewStore.settingsOpened}
          right
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
        >
          <div
            style={{
              backgroundColor: "red",
              padding: 10,
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{ paddingBottom: 20, fontSize: 20, fontWeight: "bold" }}
            >
              Settings
            </div>
            <div style={style.menuRowStyle}>
              <div>Launch at system startup:</div>
              <Toggle />
            </div>
            <div style={style.menuRowStyle}>
              <div>Contact:</div>
              <div>email here</div>
            </div>
            <div style={style.menuRowStyle}>
              <div>Donate:</div>
              <div>Paypal me</div>
            </div>
          </div>
        </Menu>
        <div id="page-wrap">
          <Header />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "50% 50%",
              columnGap: 25,
            }}
          >
            <GamesList />
            {mainViewStore.currentRightCard === "edit" ? (
              <EditCard editedItem={mainViewStore.focusedItem as any} />
            ) : mainViewStore.currentRightCard === "add" ? (
              <AddCard />
            ) : (
              <Card>
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
      </div>
    );
  }
}
