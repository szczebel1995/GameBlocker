import * as React from "react";
import { observer } from "mobx-react";
import { Card } from "./card";
import { CardHeader } from "./cardHeader";
import { FaSearch, FaPlus } from "react-icons/fa";
import { gamesStore } from "../stores/gamesStore";
import { flatten } from "lodash";
import { GamesListItem } from "./gamesListItem";
import { mainViewStore } from "../stores/ui/mainViewStore";
import { ColorE } from "../enums/color";
import { Scrollbars as Scrollbar } from "react-custom-scrollbars";

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
    console.log(mainViewStore.gamesListRerender);
    return (
      <Card>
        <CardHeader
          title={"Games"}
          buttonLeft={gamesStore.inited ? <FaSearch /> : null}
          buttonRight={
            gamesStore.inited ? (
              <FaPlus onClick={() => mainViewStore.toggleAddCardOpened(true)} />
            ) : null
          }
        />
        <Scrollbar
          autoHide={false}
          renderThumbVertical={() => (
            <div
              style={{ width: 6, backgroundColor: "white", opacity: 0.1 }}
            ></div>
          )}
        >
          {gamesStore.inited ? (
            gamesStore.gamesMap.size > 0 || gamesStore.launchersMap.size > 0 ? (
              <div>
                {flatten(
                  gamesStore.launchers.map((launcher) => {
                    const games = Array.from(launcher.gamesMap.values());
                    return [launcher, ...games];
                  })
                ).map((item) => {
                  return (
                    <GamesListItem
                      item={item}
                      onClick={() => mainViewStore.focusGamesListItem(item)}
                    />
                  );
                })}
                <GamesListItem onClick={() => ""} title="Rest of the games" />
                {gamesStore.games
                  .filter((game) => !game.launcher)
                  .map((game) => (
                    <GamesListItem
                      onClick={() => mainViewStore.focusGamesListItem(game)}
                      item={game}
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
        </Scrollbar>
      </Card>
    );
  }
}
