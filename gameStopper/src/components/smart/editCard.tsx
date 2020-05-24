import { observer } from "mobx-react";
import { onSnapshot } from "mobx-state-tree";
import * as React from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { gamesStore } from "../../stores/gamesStore";
import { IGameStore } from "../../stores/objects/gameStore";
import { ILauncherStore } from "../../stores/objects/launcherStore";
import { isLauncher, isGame } from "../../utils/types";
import { mainViewStore } from "../../views/mainView/mainViewStore";
import { Card } from "../dumb/cards/card";
import { CardHeader } from "../dumb/cards/cardHeader";
import { FilesList } from "../dumb/lists/filesList";
import { InputRow } from "../dumb/inputs/inputRow";
import { SelectInput } from "../dumb/inputs/selectInput";
import { TextInput } from "../dumb/inputs/textInput";
import { CardSegment } from "../dumb/cards/cardSegment";

export interface IEditCardProps {
  editedItem: ILauncherStore | IGameStore;
}

@observer
export class EditCard extends React.Component<IEditCardProps> {
  constructor(props: IEditCardProps) {
    super(props);

    onSnapshot(props.editedItem, () => mainViewStore.forceGamesListRerender());
  }

  render() {
    const item = this.props.editedItem; //mainViewStore.focusedGamesListItem;
    const itemIsGame = !isLauncher(item);

    if (!item) {
      return null;
    }

    return (
      <Card>
        <CardHeader
          title={item.name}
          buttonLeft={
            <FaTimes onClick={() => mainViewStore.focusGamesListItem()} />
          }
          buttonRight={
            <FaTrash
              onClick={() => {
                mainViewStore.focusGamesListItem();
                if (itemIsGame) {
                  gamesStore.removeGame(item.id);
                } else {
                  gamesStore.removeLauncher(item.id);
                }
              }}
            />
          }
        />
        <CardSegment>
          <InputRow
            label="Name:"
            input={
              <TextInput
                value={item.name}
                onChange={(name) => item.setName(name)}
              />
            }
          />
          {isGame(item) ? (
            <InputRow
              label="Launcher:"
              input={
                <SelectInput
                  onChange={(launcher) =>
                    launcher
                      ? gamesStore.addGameToLauncher(
                          item,
                          (launcher as any).value
                        )
                      : null
                  }
                  value={
                    item.launcher
                      ? { value: item.launcher, label: item.launcher }
                      : {
                          value: "",
                          label: "None",
                        }
                  }
                  values={gamesStore.launchers.map((launcher) => ({
                    value: launcher.id,
                    label: launcher.name,
                  }))}
                />
              }
            />
          ) : null}
        </CardSegment>
        <CardSegment height="100%">
          <FilesList
            filesPaths={item.paths}
            listTitle="Blocked files"
            onFileAdded={(path) => item.addPath(path)}
          />
        </CardSegment>
      </Card>
    );
  }
}
