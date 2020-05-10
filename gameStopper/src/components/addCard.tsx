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
import { ColorE } from "../enums/color";
import Select from "react-select";
import Scrollbars from "react-custom-scrollbars";
import { Button } from "./button";
import { BlockedFileListItem } from "./blockedFileListItem";
import { ToggleButton } from "./toggleButton";
import { ScrollbarThumb } from "./scrollbar/scrollbarThumb";

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
                this.state.type === "game"
                  ? gamesStore.addGame(this.state.game)
                  : gamesStore.addLauncher(this.state.launcher);
                // console.log(gamesStore)
                // mainViewStore.forceGamesListRerender();
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
                  on={this.state.type === "game"}
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
                  on={this.state.type === "launcher"}
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
          {this.state.type === "game" ? (
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
                    (item as any).launcher
                      ? {
                          value: (item as any).launcher,
                          label: (item as any).launcher,
                        }
                      : {
                          value: "",
                          label: "None",
                        }
                  }
                  onChange={(launcher) =>
                    launcher
                      ? (item as any).setLauncher((launcher as any).value)
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
          ) : null}
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
          renderThumbVertical={() => <ScrollbarThumb />}
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
              {(item as any).paths.map((path: string) => (
                <BlockedFileListItem path={path} />
              ))}
            </div>
            <div
              className="blockedFileAddButton"
              style={{
                cursor: "pointer",
                margin: 10,
                padding: 10,
                backgroundColor: ColorE.LIST_ITEM_BGD,
              }}
            >
              <FaPlus />
            </div>
          </div>
        </Scrollbars>
      </Card>
    );
  }
}
