import * as React from "react";
import { observer } from "mobx-react";
import { InputRowItem } from "../dumb/inputRowItem";
import { FaTrash, FaTimes } from "react-icons/fa";
import { CardHeader } from "../dumb/cardHeader";
import { Card } from "../dumb/card";
import { gamesStore } from "../../stores/gamesStore";
import { ILauncherStore } from "../../stores/objects/launcherStore";
import { IGameStore } from "../../stores/objects/gameStore";
import { onSnapshot } from "mobx-state-tree";
import { isLauncher } from "../../utils/types";
import { ColorE } from "../../enums/color";
import { mainViewStore } from "../../views/mainView/mainViewStore";
import { FilesList } from "../dumb/filesList";
import { SelectInput } from "../dumb/selectInput";
import { TextInput } from "../dumb/textInput";

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
    const item = mainViewStore.focusedGamesListItem;
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
        <div style={{ padding: "10px 5px" }}>
          <InputRowItem
            label="Name:"
            input={
              <TextInput
                value={item.name}
                onChange={(name) => item.setName(name)}
              />
            }
          />
          {itemIsGame ? (
            <InputRowItem
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
        </div>
        <FilesList
          filesPaths={item.paths}
          listTitle="Blocked files"
          onFileAdded={(path) => item.addPath(path)}
        />
      </Card>
    );
  }
}
