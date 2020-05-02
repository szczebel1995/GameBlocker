import * as React from "react";
import { observer } from "mobx-react";
import { Card } from "./card";
import { IGameStore, GameStore } from "../stores/objects/gameStore";
import { ILauncherStore, LauncherStore } from "../stores/objects/launcherStore";
import { CardHeader } from "./cardHeader";
import { isLauncher } from "../utils/types";
import { FaTimes, FaPlus, FaTrash, FaCheck } from "react-icons/fa";
import { InputRowItem } from "./inputRowItem";
import { mainViewStore } from "../stores/ui/mainViewStore";
import { gamesStore } from "../stores/gamesStore";

export interface IAddCardProps {
  // addItem: IGameStore | ILauncherStore;
}

interface IAddCardState {
  type: "game" | "launcher";
  game: IGameStore;
  launcher: ILauncherStore;
}

@observer
export class AddCard extends React.Component<IAddCardProps, IAddCardState> {
  constructor(props: any) {
    super(props);

    this.state = {
      type: "game",
      game: GameStore.create({ id: `${Math.random()}`, name: "" }),
      launcher: LauncherStore.create({ id: `${Math.random()}`, name: "" }),
    };
  }

  renderAddGame(game: IGameStore) {
    return (
      <div>
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
              onChange={(e) =>
                game.setLauncher(e.target.value ? e.target.value : undefined)
              }
            >
              <option value="">none</option>
              {gamesStore.launchers.map((launcher) => (
                <option value={launcher.id}>{launcher.name}</option>
              ))}
            </select>
            // <input
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

  renderAddLauncher(launcher: ILauncherStore) {
    return (
      <div>
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
    return (
      <Card style={{ border: "1px solid red" }}>
        <CardHeader
          title={`Add new ${this.state.type}`}
          buttonLeft={
            <FaTimes onClick={() => mainViewStore.focusGamesListItem()} />
          }
          buttonRight={
            <FaCheck
              onClick={() => {
                mainViewStore.focusGamesListItem();
                this.state.type === "game"
                  ? gamesStore.addGame(this.state.game)
                  : gamesStore.addLauncher(this.state.launcher);
                // console.log(gamesStore)
                // mainViewStore.forceGamesListRerender();
              }}
            />
          }
        />
        <div>
          <div>type:</div>
          <button
            onClick={() =>
              this.setState((prevState) => ({ ...prevState, type: "game" }))
            }
          >
            Game
          </button>
          <button
            onClick={() =>
              this.setState((prevState) => ({ ...prevState, type: "launcher" }))
            }
          >
            Launcher
          </button>
        </div>
        <div>
          {this.state.type === "launcher"
            ? this.renderAddLauncher(this.state.launcher)
            : this.renderAddGame(this.state.game)}
        </div>
      </Card>
    );
  }
}
