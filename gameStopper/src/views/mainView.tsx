import * as React from "react";
import { observer } from "mobx-react";
import { Header } from "../components/header";
import { GamesList } from "../components/gamesList";
import { Card } from "../components/card";
import logo from "../assets/img/logo.png";

@observer
export class MainView extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: "gray" }}>
        <Header />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <GamesList />
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
        </div>
      </div>
    );
  }
}
