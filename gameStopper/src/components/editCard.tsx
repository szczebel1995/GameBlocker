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
import Select from "react-select";
import { ColorE } from "../enums/color";
import Scrollbars from "react-custom-scrollbars";
import { BlockedFileListItem } from "./blockedFileListItem";

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
      <Card>
        <CardHeader
          title={game.name}
          buttonLeft={
            <FaTimes
              style={{ cursor: "pointer" }}
              onClick={() => mainViewStore.focusGamesListItem()}
            />
          }
          buttonRight={
            <FaTrash
              style={{ cursor: "pointer" }}
              onClick={() => {
                mainViewStore.focusGamesListItem();
                gamesStore.removeGame(game.id);
              }}
            />
          }
        />
        <div style={{ padding: "10px 5px" }}>
          <InputRowItem
            label="Name:"
            input={
              <input
                value={game.name}
                onChange={(e) => game.setName(e.target.value)}
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
          <InputRowItem
            label="Launcher:"
            input={
              <Select
                isSearchable={false}
                styles={{
                  indicatorSeparator: (provided, state) => {
                    return {
                      ...provided,
                      display: "none",
                      // opacity: 0,
                    };
                  },
                  valueContainer: (provided, state) => {
                    return {
                      ...provided,
                      color: ColorE.TEXT_COLOR,
                    };
                  },
                  menu: (provided, state) => {
                    return {
                      ...provided,
                      backgroundColor: ColorE.LIST_ITEM_BGD,
                      borderRadius: 0,
                      color: ColorE.TEXT_COLOR,
                    };
                  },
                  singleValue: (provided, state) => {
                    return {
                      ...provided,
                      color: ColorE.TEXT_COLOR,
                    };
                  },
                  control: (provided, state) => {
                    return {
                      ...provided,
                      backgroundColor: ColorE.LIST_ITEM_BGD,
                      borderRadius: 0,
                      border: "none",
                      outlineWidth: 0,
                      outline: `1px solid ${ColorE.LIST_ITEM_BGD} !important`,
                      color: ColorE.TEXT_COLOR,
                    };
                  },
                  option: (provided, { isFocused, isSelected }) => {
                    return {
                      ...provided,
                      backgroundColor: isFocused
                        ? ColorE.LIST_ITEM_HOVERED_BGD
                        : isSelected
                        ? ColorE.LIST_ITEM_ACTIVE_BGD
                        : ColorE.LIST_ITEM_BGD,
                    };
                  },
                }}
                value={
                  game.launcher
                    ? { value: game.launcher, label: game.launcher }
                    : {
                        value: "",
                        label: "None",
                      }
                }
                onChange={(launcher) =>
                  launcher
                    ? gamesStore.addGameToLauncher(
                        game,
                        (launcher as any).value
                      )
                    : null
                }
                options={[
                  { value: "", label: "None" },
                  ...gamesStore.launchers.map((launcher) => ({
                    value: launcher.id,
                    label: launcher.name,
                  })),
                ]}
              />
            }
          />
        </div>
        <div
          style={{
            fontSize: 18,
            padding: 10,
            fontWeight: "bold",
            color: ColorE.TEXT_COLOR,
          }}
        >
          Blocked files
        </div>
        <Scrollbars
          autoHide={false}
          renderThumbVertical={() => (
            <div
              style={{ width: 6, backgroundColor: "white", opacity: 0.1 }}
            ></div>
          )}
        >
          <div
            style={{
              color: ColorE.TEXT_COLOR,
              padding: 5,
              // height: "100%",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-between",
            }}
          >
            <div>
              {game.paths.map((path) => (
                <BlockedFileListItem path={path} />
              ))}
            </div>
            <div
              className="blockedFileAddButton"
              style={{
                margin: 10,
                padding: 10,
                backgroundColor: ColorE.LIST_ITEM_BGD,
              }}
            >
              <FaPlus style={{ cursor: "pointer" }} />
            </div>
          </div>
        </Scrollbars>
      </Card>
    );
  }

  renderLauncherEditForm(launcher: ILauncherStore) {
    return (
      <Card>
        <CardHeader
          title={launcher.name}
          buttonLeft={
            <FaTimes
              style={{ cursor: "pointer" }}
              onClick={() => mainViewStore.focusGamesListItem()}
            />
          }
          buttonRight={
            <FaTrash
              style={{ cursor: "pointer" }}
              onClick={() => {
                mainViewStore.focusGamesListItem();
                gamesStore.removeLauncher(launcher.id);
              }}
            />
          }
        />
        <div style={{ padding: "10px 5px" }}>
          <InputRowItem
            label="Name:"
            input={
              <input
                value={launcher.name}
                onChange={(e) => launcher.setName(e.target.value)}
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
        </div>
        <div
          style={{
            fontSize: 18,
            padding: 10,
            fontWeight: "bold",
            color: ColorE.TEXT_COLOR,
          }}
        >
          Blocked files
        </div>
        <Scrollbars
          autoHide={false}
          renderThumbVertical={() => (
            <div
              style={{ width: 6, backgroundColor: "white", opacity: 0.1 }}
            ></div>
          )}
        >
          <div
            style={{
              color: ColorE.TEXT_COLOR,
              padding: 5,
              // height: "100%",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-between",
            }}
          >
            <div>
              {launcher.paths.map((path) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "5px 10px",
                    opacity: 0.75,
                  }}
                >
                  <div>{path.split("/")[path.split("/").length - 1]}</div>
                  <div>
                    <FaTimes style={{ cursor: "pointer" }} />
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                margin: 10,
                padding: 10,
                backgroundColor: ColorE.LIST_ITEM_BGD,
              }}
            >
              <label className="custom-file-upload">
                <input
                  hidden
                  type="file"
                  onChange={(e) => {
                    const filePath = e.target.files?.item(0)?.path;
                    if (filePath) {
                      launcher.addPath(filePath);
                    }
                  }}
                />
                <FaPlus style={{ cursor: "pointer" }} />
              </label>
            </div>
          </div>
        </Scrollbars>
        {/* <div>
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
          </div> */}
      </Card>
    );
  }

  render() {
    console.log(this.state);
    const item = mainViewStore.focusedGamesListItem as string;

    if (!mainViewStore.focusedItem) {
      return null;
    }

    return isLauncher(mainViewStore.focusedItem)
      ? this.renderLauncherEditForm(mainViewStore.focusedItem)
      : this.renderGameEditForm(mainViewStore.focusedItem);
  }
}
