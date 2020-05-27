import * as React from "react";
import Spinner from "react-loader-spinner";
import { Status } from "../dumb/status";
import { themes } from "../../themes";
import { FaSearch } from "react-icons/fa";
import { observer } from "mobx-react";
import { Button } from "../dumb/buttons/button";
import { rootStore } from "../../stores/rootStore";

@observer
export class GamesListStatus extends React.Component {
  render() {
    const { mainViewStore, gamesStore } = rootStore;

    if (mainViewStore.gamesListStatus === "initing") {
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
    } else if (mainViewStore.gamesListStatus === "scanning") {
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
    } else if (mainViewStore.gamesListStatus === "empty") {
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
    } else {
      return null;
    }
  }
}
