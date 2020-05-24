import * as React from "react";
import { observer } from "mobx-react";
import { Card } from "../dumb/cards/card";
import { Status } from "../dumb/status";
import { AddCard } from "./addCard";
import { EditCard } from "./editCard";
import logo from "../../assets/img/logo.png";
import { rootStore } from "../../stores/rootStore";

@observer
export class MainViewRightCard extends React.Component {
  render() {
    const { gamesStore, mainViewStore } = rootStore;
    if (mainViewStore.currentRightCard === "edit") {
      return (
        <EditCard editedItem={mainViewStore.focusedGamesListItem as any} />
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
