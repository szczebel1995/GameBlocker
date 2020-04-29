import * as React from "react";
import { observer } from "mobx-react";
import { InputRowItem } from "./inputRowItem";
import { mainViewStore } from "../stores/ui/mainViewStore";
import { FaTrash, FaTimes } from "react-icons/fa";
import { CardHeader } from "./cardHeader";
import { Card } from "./card";
import { gamesStore } from "../stores/gamesStore";
import { LauncherStore } from "../stores/objects/launcherStore";
import { GameStore } from "../stores/objects/gameStore";

@observer
export class EditCard extends React.Component {
  store =
    mainViewStore.focusedGamesListItemType === "launcher"
      ? LauncherStore.create(
          JSON.parse(
            JSON.stringify(
              gamesStore.launchersMap.get(
                mainViewStore.focusedGamesListItem as string
              ) as any
            )
          )
        )
      : GameStore.create(
          JSON.parse(
            JSON.stringify(
              gamesStore.gamesMap.get(
                mainViewStore.focusedGamesListItem as string
              )
            )
          )
        );

  render() {
    const item = mainViewStore.focusedGamesListItem as string;

    return (
      <Card style={{ border: "1px solid red" }}>
        <CardHeader
          title={item}
          buttonLeft={
            <FaTimes onClick={() => mainViewStore.focusGamesListItem()} />
          }
          buttonRight={
            <FaTrash
              onClick={() => {
                mainViewStore.focusGamesListItem();
                gamesStore.removeGame(item);
              }}
            />
          }
        />
        <InputRowItem
          label="Name:"
          input={
            <input
              style={{ width: 200 }}
              value={this.store.name}
              type="text"
              onChange={(e) => (this.store as any).setName(e.target.value)}
            />
          }
        />
        <InputRowItem
          label="Icon:"
          input={<input style={{ width: 200 }} type="text" />}
        />
        <InputRowItem
          label="Location:"
          input={<input style={{ width: 200 }} type="text" />}
        />
        {mainViewStore.focusedGamesListItemType === "game" ? (
          <InputRowItem
            label="Launcher:"
            input={<input style={{ width: 200 }} type="text" />}
          />
        ) : null}
      </Card>
    );
  }
}
