import * as React from "react";
import { observer } from "mobx-react";
import { Card } from "./card";
import { CardHeader } from "./cardHeader";
import { FaSearch, FaPlus } from "react-icons/fa";
import { gamesStore } from "../stores/gamesStore";
import { flatten } from "lodash";
import { GamesListItem } from "./gamesListItem";
import { Scrollbars as Scrollbar } from "react-custom-scrollbars";
import { Button } from "./button";
import Spinner from "react-loader-spinner";
import { ScrollbarThumb } from "./scrollbar/scrollbarThumb";
import { Clickable } from "./clickable";
import { themes } from "../themes";
import { Status } from "./status";
import { mainViewStore } from "../views/mainView/mainViewStore";

@observer
export class GamesList extends React.Component {
  renderStatus() {
    const noGamesOrLaunchers =
      gamesStore.gamesMap.size <= 0 && gamesStore.launchersMap.size <= 0;

    if (gamesStore.scanning) {
      return (
        <Status
          icon={
            <Spinner
              type="Rings"
              color={themes.dark.colors.secondary.normal}
              height={100}
              width={100}
            />
          }
          message="Scanning for games, this might take a while..."
        />
      );
    } else if (!gamesStore.inited) {
      return (
        <Status
          icon={
            <Spinner
              type="Rings"
              color={themes.dark.colors.secondary.normal}
              height={100}
              width={100}
            />
          }
          message="Loading games..."
        />
      );
    } else if (noGamesOrLaunchers) {
      return (
        <Status
          icon={
            <FaSearch size={60} color={themes.dark.colors.secondary.normal} />
          }
          message="Your Games list is empty. Scan computer for games to block."
          bottomRow={
            <Button
              title={"SCAN"}
              onClick={() => gamesStore.scanForLaunchers()}
            />
          }
        />
      );
    }
  }

  renderGames() {
    const launchersAndThierGames = flatten(
      gamesStore.launchers.map((launcher) => {
        const games = Array.from(launcher.gamesMap.values());
        return [launcher, ...games];
      })
    );
    const launcherlessGames = gamesStore.games.filter((game) => !game.launcher);

    return (
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
            onClick={() => mainViewStore.focusGamesListItem(game)}
            item={game}
            focused={
              mainViewStore.focusedGamesListItem &&
              mainViewStore.focusedGamesListItem.id === game.id
            }
          />
        ))}
      </div>
    );
  }

  render() {
    console.log(mainViewStore.gamesListRerender);

    return (
      <Card>
        <CardHeader
          title={"Games"}
          buttonRight={
            gamesStore.inited ? (
              <Clickable
                onClick={() => mainViewStore.toggleAddCardOpened(true)}
              >
                <FaPlus />
              </Clickable>
            ) : null
          }
        />
        <Scrollbar
          autoHide={false}
          renderThumbVertical={() => <ScrollbarThumb />}
        >
          {this.renderStatus() || this.renderGames()}
        </Scrollbar>
      </Card>
    );
  }
}
