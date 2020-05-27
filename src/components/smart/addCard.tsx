import { observer } from "mobx-react";
import * as React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { GameStore, IGameStore } from "../../stores/objects/gameStore";
import {
  ILauncherStore,
  LauncherStore,
} from "../../stores/objects/launcherStore";
import { randomNumber } from "../../utils";
import { isGame } from "../../utils/types";
import { Card } from "../dumb/cards/card";
import { CardHeader } from "../dumb/cards/cardHeader";
import { FilesList } from "../dumb/lists/filesList";
import { InputRow } from "../dumb/inputs/inputRow";
import { SelectInput } from "../dumb/inputs/selectInput";
import { TextInput } from "../dumb/inputs/textInput";
import { ToggleButton } from "../dumb/buttons/toggleButton";
import { CardSegment } from "../dumb/cards/cardSegment";
import { ButtonGroup } from "../dumb/buttons/buttonGroup";
import { rootStore } from "../../stores/rootStore";

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
    const { mainViewStore, gamesStore } = rootStore;

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
          <InputRow
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
          <InputRow
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
            <InputRow
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
            filesPaths={(item as any).paths}
            onFileAdded={(path) => item.addPath(path)}
            onFileRemoved={(path) => item.removePath(path)}
          />
        </CardSegment>
      </Card>
    );
  }
}
