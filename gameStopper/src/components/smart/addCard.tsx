import * as React from "react";
import { observer } from "mobx-react";
import { Card } from "../dumb/card";
import { IGameStore, GameStore } from "../../stores/objects/gameStore";
import {
  ILauncherStore,
  LauncherStore,
} from "../../stores/objects/launcherStore";
import { CardHeader } from "../dumb/cardHeader";
import { FaTimes, FaPlus, FaCheck } from "react-icons/fa";
import { InputRowItem } from "../dumb/inputRowItem";
import { gamesStore } from "../../stores/gamesStore";
import { ColorE } from "../../enums/color";
import Select from "react-select";
import Scrollbars from "react-custom-scrollbars";
import { BlockedFileListItem } from "../dumb/blockedFileListItem";
import { ToggleButton } from "../dumb/toggleButton";
import { ScrollbarThumb } from "../dumb/scrollbarThumb";
import { mainViewStore } from "../../views/mainView/mainViewStore";
import { isLauncher } from "../../utils/types";
import { SelectInput } from "../dumb/selectInput";
import { FilesList } from "../dumb/filesList";

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
      game: GameStore.create({
        id: `${Math.floor(Math.random() * 10000000)}`,
        name: "",
      }),
      launcher: LauncherStore.create({
        id: `${Math.floor(Math.random() * 10000000)}`,
        name: "",
      }),
    };
  }

  render() {
    const item =
      this.state.type === "launcher" ? this.state.launcher : this.state.game;
    const itemIsGame = !isLauncher(item);

    return (
      <Card>
        <CardHeader
          title={`Add new ${this.state.type}`}
          buttonLeft={
            <FaTimes
              style={{ cursor: "pointer" }}
              onClick={() => mainViewStore.focusGamesListItem()}
            />
          }
          buttonRight={
            <FaCheck
              style={{ cursor: "pointer" }}
              onClick={() => {
                mainViewStore.focusGamesListItem();
                itemIsGame
                  ? gamesStore.addGame(this.state.game)
                  : gamesStore.addLauncher(this.state.launcher);
              }}
            />
          }
        />
        <div style={{ padding: "10px 5px" }}>
          <InputRowItem
            label={"Type:"}
            input={
              <div style={{ display: "flex" }}>
                <ToggleButton
                  toggledOn={itemIsGame}
                  title={"Game"}
                  onClick={() =>
                    this.setState((prevState) => ({
                      ...prevState,
                      type: "game",
                    }))
                  }
                />
                <div style={{ width: 10 }}></div>
                <ToggleButton
                  toggledOn={!itemIsGame}
                  title={"Launcher"}
                  onClick={() =>
                    this.setState((prevState) => ({
                      ...prevState,
                      type: "launcher",
                    }))
                  }
                />
              </div>
            }
          />
          <InputRowItem
            label="Name:"
            input={
              <input
                value={item.name}
                onChange={(e) => item.setName(e.target.value)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  height: 38,
                  backgroundColor: ColorE.LIST_ITEM_BGD,
                  border: "none",
                  color: ColorE.TEXT_COLOR,
                  paddingLeft: 10,
                }}
                type="text"
              />
            }
          />
          {itemIsGame ? (
            <InputRowItem
              label="Launcher:"
              input={
                <SelectInput
                  value={
                    (item as IGameStore).launcher
                      ? {
                          value: (item as IGameStore).launcher,
                          label: (item as IGameStore).launcher,
                        }
                      : { value: "", label: "None" }
                  }
                  onChange={(launcher) =>
                    launcher
                      ? (item as IGameStore).setLauncher(launcher.value)
                      : null
                  }
                  values={gamesStore.launchers.map((launcher) => ({
                    value: launcher.id,
                    label: launcher.name,
                  }))}
                />
              }
            />
          ) : null}
        </div>
        <FilesList
          listTitle={"Blocked files"}
          filesPaths={(item as any).paths}
        />
      </Card>
    );
  }
}
