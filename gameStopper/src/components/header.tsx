import * as React from "react";
import { observer } from "mobx-react";
import logo from "../assets/img/logo.png";
import Toggle from "react-toggle";
import { FaCog } from "react-icons/fa";
import { Card } from "./card";
import { mainViewStore } from "../stores/ui/mainViewStore";
import { ColorE } from "../enums/color";
import { blocksStore } from "../stores/blocksStore";

@observer
export class Header extends React.Component {
  render() {
    return (
      <Card
        style={{
          paddingBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 20,
            color: ColorE.TEXT_COLOR,
          }}
        >
          <img style={{ height: 50 }} src={logo} alt="logo" />
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <div style={{ paddingLeft: 10, fontSize: 22, fontWeight: "bold" }}>
              GameBlocker
            </div>
            <div
              style={{
                paddingLeft: 7,
                opacity: 0.4,
                fontSize: 16,
                paddingBottom: 2,
              }}
            >
              alpha
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: ColorE.TEXT_COLOR,
            alignItems: "center",
          }}
        >
          <div style={{ opacity: 0.8, fontSize: 18 }}>
            <b>Score:</b> {"2d 15h 42m 11s"}
          </div>
          <div style={{ paddingLeft: 20, paddingRight: 20, marginBottom: -5 }}>
            <Toggle
              checked={blocksStore.blockOn}
              onChange={(e) =>
                e.target.checked
                  ? blocksStore.startBlock()
                  : blocksStore.stopBlock()
              }
            />
          </div>
          {/* <div>{"On"}</div> */}
          <FaCog
            style={{ cursor: "pointer" }}
            onClick={() => mainViewStore.toggleSettingsOpened()}
          />
        </div>
      </Card>
    );
  }
}
