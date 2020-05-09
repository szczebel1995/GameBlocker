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
import { InputRowItem } from "../components/inputRowItem";
import {
  GiMagicPotion,
  GiHealthPotion,
  GiPotionBall,
  GiBroadsword,
} from "react-icons/gi";

@observer
export class MainView extends React.Component {
  render() {
    const style = {
      menuRowStyle: { display: "flex", justifyContent: "space-between" },
    };

    return (
      <div id="outer-container">
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
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: ColorE.TEXT_COLOR,
              backgroundColor: ColorE.LIST_ITEM_ACTIVE_BGD,
              padding: 10,
              paddingBottom: 20,
              boxSizing: "border-box",
            }}
          >
            <div
              style={
                {
                  // height: "100%",
                }
              }
            >
              <div
                style={{ paddingBottom: 20, fontSize: 22, fontWeight: "bold" }}
              >
                Settings
              </div>
              <InputRowItem
                label={(<b>Launch at system startup:</b>) as any}
                spacedBetween
                input={<Toggle />}
              />
              <div style={{ height: 20 }}></div>
              <InputRowItem
                label={
                  (
                    <div>
                      <div style={{ fontWeight: "bold" }}>Contact:</div>
                      <a style={{ color: ColorE.TEXT_COLOR }} href="">
                        contact@gameblocker.com
                      </a>
                    </div>
                  ) as any
                }
                spacedBetween
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
                      <a style={{ color: ColorE.TEXT_COLOR }} href="">
                        paypal.me
                      </a>
                    </div>
                  ) as any
                }
                spacedBetween
                input={""}
              />
            </div>
            <div style={{ opacity: 0.8, fontSize: 14 }}>
              <div>2020 © GameStopper</div>
            </div>
          </div>
        </Menu>
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
