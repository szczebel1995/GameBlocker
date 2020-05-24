import { flatten } from "lodash";
import { observer } from "mobx-react";
import * as React from "react";
import { Scrollbars as Scrollbar } from "react-custom-scrollbars";
import { FaPlus } from "react-icons/fa";
import { gamesStore } from "../../stores/gamesStore";
import { mainViewStore } from "../../views/mainView/mainViewStore";
import { Card } from "../dumb/cards/card";
import { CardHeader } from "../dumb/cards/cardHeader";
import { GamesListItem } from "../dumb/lists/gamesListItem";
import { ScrollbarThumb } from "../dumb/scrollbarThumb";

@observer
export class GamesList extends React.Component {
  render() {
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
          {
            // <GamesListStatus />
            false || (
              <div>
                {launchersAndThierGames.map((item) => (
                  <GamesListItem
                    item={item}
                    onClick={() =>
                      mainViewStore.focusGamesListItem(
                        gamesStore.gamesMap.get(item.id)
                      )
                    }
                    focused={
                      false
                      // mainViewStore.focusedGamesListItem &&
                      // mainViewStore.focusedGamesListItem.id === item.id
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
                      false
                      // mainViewStore.focusedGamesListItem &&
                      // mainViewStore.focusedGamesListItem.id === game.id
                    }
                  />
                ))}
              </div>
            )
          }
        </Scrollbar>
      </Card>
    );
  }
}
