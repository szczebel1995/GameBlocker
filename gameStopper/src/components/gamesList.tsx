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
import { Button } from "./button";
import Spinner from "react-loader-spinner";

@observer
export class GamesList extends React.Component {
  renderNoGames() {
    return (
      <div
        style={{
          color: ColorE.TEXT_COLOR,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <FaSearch
          style={{ cursor: "pointer" }}
          size={60}
          color={ColorE.LIST_ITEM_ACTIVE_BGD}
        />
        <div style={{ padding: 20 }}>
          Your Games list is empty. Scan computer for games to block.
        </div>
        <Button title={"SCAN"} onClick={() => gamesStore.scanForLaunchers()} />
      </div>
    );
  }

  render() {
    console.log(mainViewStore.gamesListRerender);
    return (
      <Card>
        <CardHeader
          title={"Games"}
          buttonLeft={
            gamesStore.inited ? (
              <FaSearch style={{ opacity: 0, cursor: "pointer" }} />
            ) : null
          }
          buttonRight={
            gamesStore.inited ? (
              <FaPlus
                style={{ cursor: "pointer" }}
                onClick={() => mainViewStore.toggleAddCardOpened(true)}
              />
            ) : null
          }
        />
        {gamesStore.scanning ? (
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <Spinner
                type="Rings"
                color={ColorE.LIST_ITEM_ACTIVE_BGD}
                height={100}
                width={100}
              />
              <div
                style={{
                  fontSize: 18,
                  color: ColorE.TEXT_COLOR,
                  padding: 20,
                  paddingTop: 0,
                  opacity: 0.5,
                }}
              >
                Scanning for games, this might take a while...
              </div>
            </div>
          </div>
        ) : (
          <Scrollbar
            autoHide={false}
            renderThumbVertical={() => (
              <div
                style={{ width: 6, backgroundColor: "white", opacity: 0.1 }}
              ></div>
            )}
          >
            {gamesStore.inited ? (
              gamesStore.gamesMap.size > 0 ||
              gamesStore.launchersMap.size > 0 ? (
                <div>
                  {flatten(
                    gamesStore.launchers.map((launcher) => {
                      const games = Array.from(launcher.gamesMap.values());
                      return [launcher, ...games];
                    })
                  ).map((item) => {
                    return (
                      <GamesListItem
                        focused={
                          mainViewStore.focusedItem &&
                          mainViewStore.focusedItem.id === item.id
                        }
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
            ) : null}
          </Scrollbar>
        )}
      </Card>
    );
  }
}
