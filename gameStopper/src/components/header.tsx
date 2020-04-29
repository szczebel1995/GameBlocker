import * as React from "react";
import { observer } from "mobx-react";
import logo from "../assets/img/logo.png";
import Toggle from "react-toggle";
import { FaCog } from "react-icons/fa";
import { Card } from "./card";

@observer
export class Header extends React.Component {
  render() {
    return (
      <Card
        style={{
          padding: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img style={{ height: 50 }} src={logo} alt="logo" />
          <div>GameBlocker</div>
          <div>alpha</div>
        </div>
        <div style={{ display: "flex" }}>
          <div>Score: {"score"}</div>
          <Toggle />
          <div>{"On"}</div>
          <FaCog />
        </div>
      </Card>
    );
  }
}
