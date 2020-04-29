import * as React from "react";
import { observer } from "mobx-react";
import { Card } from "./card";
import { CardHeader } from "./cardHeader";
import { FaSearch, FaPlus } from "react-icons/fa";

@observer
export class GamesList extends React.Component {
  renderNoGames() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <FaSearch size={60} color="red" />
        <div style={{ padding: 20 }}>
          Your Games list is empty. Scan computer for games to block.
        </div>
        <button>SCAN</button>
      </div>
    );
  }

  render() {
    return (
      <Card
        style={{
          borderWidth: 1,
          borderColor: "red",
          border: "1px solid red",
        }}
      >
        <CardHeader
          title={"Games"}
          buttonLeft={<FaSearch />}
          buttonRight={<FaPlus />}
        />
        <div className="flexCenter" style={{ height: "100%", width: "100%" }}>
          {this.renderNoGames()}
        </div>
      </Card>
    );
  }
}
