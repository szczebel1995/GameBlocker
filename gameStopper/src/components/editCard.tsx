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
import { applySnapshot } from "mobx-state-tree";
import { isLauncher } from "../utils/types";

export interface IEditCardProps {
  editedItem: ILauncherStore | IGameStore;
}

@observer
export class EditCard extends React.Component<IEditCardProps> {
  // state = {
  //   id: "",
  //   nameInput: "",
  //   iconInput: "",
  //   paths: [],
  //   launcherInput: "",
  // };

  // constructor(props: IEditCardProps) {
  //   super(props);
  //   this.state = this.getStateFromEditedItem(props.editedItem);
  // }

  // componentWillReceiveProps(newProps: IEditCardProps) {
  //   if (newProps.editedItem.id !== this.state.id) {
  //     this.setState(this.getStateFromEditedItem(newProps.editedItem));
  //   }
  // }

  // componentDidUpdate() {
  //   this.saveEditedObjectFromState();
  // }

  // getStateFromEditedItem(editedItem: ILauncherStore | IGameStore) {
  //   const { icon, name, paths, id } = editedItem;

  //   return {
  //     id,
  //     nameInput: name,
  //     iconInput: icon || "",
  //     paths: paths as any,
  //     launcherInput: (editedItem as any).launcher
  //       ? (editedItem as any).launcher
  //       : undefined,
  //   };
  // }

  // getEditedObjectFromState() {
  //   const { iconInput, launcherInput, nameInput, id, paths } = this.state;
  //   if (isLauncher(this.props.editedItem)) {
  //     return LauncherStore.create({
  //       id,
  //       name: nameInput,
  //       gamesMap: this.props.editedItem.gamesMap as any,
  //       icon: iconInput,
  //       paths,
  //     });
  //   } else {
  //     return GameStore.create({
  //       id,
  //       name: nameInput,
  //       paths,
  //       icon: iconInput,
  //       launcher: launcherInput,
  //     });
  //   }
  // }

  // saveEditedObjectFromState() {
  //   applySnapshot(this.props.editedItem, this.getEditedObjectFromState());
  // }

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
        {/* <InputRowItem
          label="Icon:"
          input={
            <input
              value={game.icon}
              onChange={(e) => game.setIcon(e.target.value)}
              style={{ width: 200 }}
              type="text"
            />
          }
        /> */}
        <InputRowItem
          label="Launcher:"
          input={
            <input
              value={game.launcher}
              onChange={(e) => game.setLauncher(e.target.value)}
              style={{ width: 200 }}
              type="text"
            />
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
        {/* <CardHeader
          title={item}
          buttonLeft={
            <FaTimes onClick={() => mainViewStore.focusGamesListItem()} />
          }
          buttonRight={
            <FaTrash
              onClick={() => {
                mainViewStore.focusGamesListItem();
                gamesStore.removeGame(item);
              }}
            />
          }
        />
        <InputRowItem
          label="Name:"
          input={
            <input
              value={name}
              onChange={(e) => }
              style={{ width: 200 }}
              type="text"
            />
          }
        />
        <InputRowItem
          label="Icon:"
          input={
            <input
              // value={this.state.iconInput}
              // onChange={(e) =>
              //   this.setState((prevState) => ({
              //     ...prevState,
              //     iconInput: e.target.value,
              //   }))
              // }
              style={{ width: 200 }}
              type="text"
            />
          }
        />
        {mainViewStore.focusedGamesListItemType === "game" ? (
          <InputRowItem
            label="Launcher:"
            input={
              <input
                // value={this.state.launcherInput}
                // onChange={(e) =>
                //   this.setState((prevState) => ({
                //     ...prevState,
                //     launcherInput: e.target.value,
                //   }))
                // }
                style={{ width: 200 }}
                type="text"
              />
            }
          />
        ) : null} */}
      </Card>
    );
  }
}
