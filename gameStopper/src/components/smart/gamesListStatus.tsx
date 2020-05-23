import * as React from "react";
import { gamesStore } from "../../stores/gamesStore";
import Spinner from "react-loader-spinner";
import { Status } from "../dumb/status";
import { themes } from "../../themes";
import { FaSearch } from "react-icons/fa";
import { Button } from "../dumb/button";
import { observer } from "mobx-react";

@observer
export class GamesListStatus extends React.Component {
  render() {
    const noGamesOrLaunchers =
      gamesStore.gamesMap.size <= 0 && gamesStore.launchersMap.size <= 0;

    if (!gamesStore.inited) {
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
    } else if (gamesStore.scanning) {
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
}
