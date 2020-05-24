import * as React from "react";
import { observer } from "mobx-react";
import { Card } from "../dumb/card";
import { Status } from "../dumb/status";
import { AddCard } from "./addCard";
import { EditCard } from "./editCard";
import { mainViewStore } from "../../views/mainView/mainViewStore";
import logo from "../../assets/img/logo.png";
import { gamesStore } from "../../stores/gamesStore";

@observer
export class MainViewRightCard extends React.Component {
  render() {
    if (mainViewStore.currentRightCard === "edit") {
      return (
        <EditCard
          editedItem={
            gamesStore.games[0] /* mainViewStore.focusedGamesListItem as any */
          }
        />
      );
    } else if (mainViewStore.currentRightCard === "add") {
      return <AddCard />;
    } else {
      return (
        <Card transparent>
          <Status
            icon={
              <img
                style={{ opacity: 0.5, height: "40%" }}
                src={logo}
                alt="logo"
              />
            }
          />
        </Card>
      );
    }
  }
}
