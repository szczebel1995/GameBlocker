import * as React from "react";
import { observer } from "mobx-react";
import { InputRowItem } from "./inputRowItem";
import { mainViewStore } from "../stores/ui/mainViewStore";
import { FaTrash, FaTimes, FaPlus } from "react-icons/fa";
import { CardHeader } from "./cardHeader";
import { Card } from "./card";
import { gamesStore } from "../stores/gamesStore";
import { LauncherStore, ILauncherStore } from "../stores/objects/launcherStore";
import { GameStore, IGameStore } from "../stores/objects/gameStore";
import { applySnapshot, onSnapshot } from "mobx-state-tree";
import { isLauncher } from "../utils/types";

export interface IEditCardProps {
  editedItem: ILauncherStore | IGameStore;
}

@observer
export class EditCard extends React.Component<IEditCardProps> {
  constructor(props: IEditCardProps) {
    super(props);

    onSnapshot(props.editedItem, () => mainViewStore.forceGamesListRerender());
  }

  renderGameEditForm(game: IGameStore) {
    return (
      <div>
        <CardHeader
          title={game.name}
          buttonLeft={
            <FaTimes onClick={() => mainViewStore.focusGamesListItem()} />
          }
          buttonRight={
            <FaTrash
              onClick={() => {
                mainViewStore.focusGamesListItem();
                gamesStore.removeGame(game.id);
              }}
            />
          }
        />
        <InputRowItem
          label="Name:"
          input={
            <input
              value={game.name}
              onChange={(e) => game.setName(e.target.value)}
              style={{ width: 200 }}
              type="text"
            />
          }
        />
        <InputRowItem
          label="Launcher:"
          input={
            <select
              name=""
              id=""
              value={game.launcher}
              onChange={(e) => {
                gamesStore.addGameToLauncher(game, e.target.value);
              }}
            >
              <option value="">none</option>
              {gamesStore.launchers.map((launcher) => (
                <option value={launcher.id}>{launcher.name}</option>
              ))}
            </select>
            //  <input
            //   value={game.launcher}
            //   onChange={(e) => game.setLauncher(e.target.value)}
            //   style={{ width: 200 }}
            //   type="text"
            // />
          }
        />
        <div>
          <div>Blocked files</div>
          <div>
            {game.paths.map((path) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "5px 10px",
                }}
              >
                <div>{path.split("/")[path.split("/").length - 1]}</div>
                <div>
                  <FaTimes />
                </div>
              </div>
            ))}
            <div>
              <FaPlus />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderLauncherEditForm(launcher: ILauncherStore) {
    return (
      <div>
        <CardHeader
          title={launcher.name}
          buttonLeft={
            <FaTimes onClick={() => mainViewStore.focusGamesListItem()} />
          }
          buttonRight={
            <FaTrash
              onClick={() => {
                mainViewStore.focusGamesListItem();
                gamesStore.removeLauncher(launcher.id);
              }}
            />
          }
        />
        <InputRowItem
          label="Name:"
          input={
            <input
              value={launcher.name}
              onChange={(e) => launcher.setName(e.target.value)}
              style={{ width: 200 }}
              type="text"
            />
          }
        />
        <div>
          <div>Blocked files</div>
          <div>
            {launcher.paths.map((path) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "5px 10px",
                }}
              >
                <div>{path.split("/")[path.split("/").length - 1]}</div>
                <div>
                  <FaTimes />
                </div>
              </div>
            ))}
            <div>
              <FaPlus />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.state);
    const item = mainViewStore.focusedGamesListItem as string;

    if (!mainViewStore.focusedItem) {
      return null;
    }

    return (
      <Card style={{ border: "1px solid red" }}>
        {isLauncher(mainViewStore.focusedItem)
          ? this.renderLauncherEditForm(mainViewStore.focusedItem)
          : this.renderGameEditForm(mainViewStore.focusedItem)}
      </Card>
    );
  }
}
