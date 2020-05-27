import { flatten } from "lodash";
import { observer } from "mobx-react";
import * as React from "react";
import { Scrollbars as Scrollbar } from "react-custom-scrollbars";
import { FaPlus } from "react-icons/fa";
import { Card } from "../dumb/cards/card";
import { CardHeader } from "../dumb/cards/cardHeader";
import { GamesListItem } from "../dumb/lists/gamesListItem";
import { ScrollbarThumb } from "../dumb/scrollbarThumb";
import { GamesListStatus } from "./gamesListStatus";
import { rootStore } from "../../stores/rootStore";

@observer
export class GamesList extends React.Component {
  render() {
    const { mainViewStore, gamesStore } = rootStore;
    console.log(mainViewStore.gamesListRerender);

    const launchersAndThierGames = flatten(
      gamesStore.launchers.map((launcher) => {
        const games = Array.from(launcher.gamesMap.values());
        return [launcher, ...games];
      })
    );
    const launcherlessGames = gamesStore.games.filter((game) => !game.launcher);

    return (
      <Card>
        <CardHeader
          title={"Games"}
          buttonRight={
            gamesStore.inited ? (
              <FaPlus onClick={() => mainViewStore.toggleAddCardOpened(true)} />
            ) : null
          }
        />
        <Scrollbar
          autoHide={false}
          renderThumbVertical={() => <ScrollbarThumb />}
        >
          {mainViewStore.gamesListStatus ? (
            <GamesListStatus />
          ) : (
            <div>
              {launchersAndThierGames.map((item) => (
                <GamesListItem
                  item={item}
                  onClick={() => mainViewStore.focusGamesListItem(item)}
                  focused={
                    mainViewStore.focusedGamesListItem &&
                    mainViewStore.focusedGamesListItem.id === item.id
                  }
                />
              ))}
              <GamesListItem title="Rest of the games" />
              {launcherlessGames.map((game) => (
                <GamesListItem
                  onClick={() =>
                    mainViewStore.focusGamesListItem(
                      gamesStore.gamesMap.get(game.id)
                    )
                  }
                  item={game}
                  focused={
                    mainViewStore.focusedGamesListItem &&
                    mainViewStore.focusedGamesListItem.id === game.id
                  }
                />
              ))}
            </div>
          )}
        </Scrollbar>
      </Card>
    );
  }
}
