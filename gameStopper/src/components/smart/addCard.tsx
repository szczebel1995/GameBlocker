import * as React from "react";
import { observer } from "mobx-react";
import { Card } from "../dumb/card";
import { IGameStore, GameStore } from "../../stores/objects/gameStore";
import {
  ILauncherStore,
  LauncherStore,
} from "../../stores/objects/launcherStore";
import { CardHeader } from "../dumb/cardHeader";
import { FaTimes, FaCheck } from "react-icons/fa";
import { InputRowItem } from "../dumb/inputRowItem";
import { gamesStore } from "../../stores/gamesStore";
import { ToggleButton } from "../dumb/toggleButton";
import { mainViewStore } from "../../views/mainView/mainViewStore";
import { isGame } from "../../utils/types";
import { SelectInput } from "../dumb/selectInput";
import { FilesList } from "../dumb/filesList";
import { TextInput } from "../dumb/textInput";
import { randomNumber } from "../../utils";
import { ButtonGroup } from "../dumb/buttonGroup";
import { CardSegment } from "../dumb/cardSegment";

export interface IAddCardProps {}

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
      game: GameStore.create({ id: `${randomNumber()}`, name: "" }),
      launcher: LauncherStore.create({ id: `${randomNumber()}`, name: "" }),
    };
  }

  render() {
    const item =
      this.state.type === "launcher" ? this.state.launcher : this.state.game;
    const itemIsGame = isGame(item);

    return (
      <Card>
        <CardHeader
          title={`Add new ${this.state.type}`}
          buttonLeft={
            <FaTimes onClick={() => mainViewStore.focusGamesListItem()} />
          }
          buttonRight={
            <FaCheck
              onClick={() => {
                mainViewStore.focusGamesListItem();
                itemIsGame
                  ? gamesStore.addGame(this.state.game)
                  : gamesStore.addLauncher(this.state.launcher);
              }}
            />
          }
        />
        <CardSegment>
          <InputRowItem
            label={"Type:"}
            input={
              <ButtonGroup>
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
              </ButtonGroup>
            }
          />
          <InputRowItem
            label="Name:"
            input={
              <TextInput
                placeholder={"Name..."}
                value={item.name}
                onChange={(name) => item.setName(name)}
              />
            }
          />
          {isGame(item) && (
            <InputRowItem
              label="Launcher:"
              input={
                <SelectInput
                  value={
                    item.launcher
                      ? { value: item.launcher, label: item.launcher }
                      : { value: "", label: "None" }
                  }
                  onChange={(launcher) =>
                    launcher ? item.setLauncher(launcher.value) : null
                  }
                  values={gamesStore.launchers.map((launcher) => ({
                    value: launcher.id,
                    label: launcher.name,
                  }))}
                />
              }
            />
          )}
        </CardSegment>
        <CardSegment height={"100%"}>
          <FilesList
            listTitle={"Blocked files"}
            // filesPaths={(item as any).paths}
            filesPaths={[
              "sdfgsdsgf",
              "sdfgsdsgf",
              "sdfgsdsgf",
              "sdfgsdsgf",
              "sdfgsdsgf",
              "sdfgsdsgf",
              "sdfgsdsgf",
              "sdfgsdsgf",
              "sdfgsdsgf",
              "sdfgsdsgf",
              "sdfgsdsgf",
              "sdfgsdsgf",
              "sdfgsdsgf",
              "sdfgsdsgf",
              "sdfgsdsgf",
              "sdfgsdsgf",
            ]}
            onFileAdded={(path) => item.addPath(path)}
          />
        </CardSegment>
      </Card>
    );
  }
}
