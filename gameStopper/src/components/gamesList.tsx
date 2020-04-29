import * as React from "react";
import { observer } from "mobx-react";
import { Card } from "./card";
import { CardHeader } from "./cardHeader";
import { FaSearch, FaPlus } from "react-icons/fa";
import { gamesStore } from "../stores/gamesStore";
import { flatten } from "lodash";
import { GamesListItem } from "./gamesListItem";
import { mainViewStore } from "../stores/ui/mainViewStore";

@observer
export class GamesList extends React.Component {
  renderNoGames() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <FaSearch size={60} color="red" />
        <div style={{ padding: 20 }}>
          Your Games list is empty. Scan computer for games to block.
        </div>
        <button onClick={() => gamesStore.scanForLaunchers()}>SCAN</button>
      </div>
    );
  }

  render() {
    return (
      <Card
        style={{
          borderWidth: 1,
          borderColor: "red",
          border: "1px solid red",
        }}
      >
        <CardHeader
          title={"Games"}
          buttonLeft={gamesStore.inited ? <FaSearch /> : null}
          buttonRight={gamesStore.inited ? <FaPlus /> : null}
        />
        {gamesStore.inited ? (
          gamesStore.gamesMap.size > 0 || gamesStore.launchersMap.size > 0 ? (
            <div>
              {flatten(
                Array.from(gamesStore.launchersMap.values()).map((launcher) => {
                  const games = Array.from(launcher.gamesMap.values());
                  console.log("@_@", games, launcher);
                  return [launcher, ...games];
                })
              ).map((item) => (
                <GamesListItem
                  item={item as any}
                  onClick={() => mainViewStore.focusGamesListItem(item)}
                />
              ))}
            </div>
          ) : (
            <div
              className="flexCenter"
              style={{ height: "100%", width: "100%" }}
            >
              {this.renderNoGames()}
            </div>
          )
        ) : (
          <div>loading games</div>
        )}
      </Card>
    );
  }
}
