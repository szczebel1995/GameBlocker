import { observer } from "mobx-react";
import * as React from "react";
import { FaCog } from "react-icons/fa";
import Toggle from "react-toggle";
import { styled } from "../../themes";
import { ButtonGroup } from "../dumb/buttons/buttonGroup";
import { rootStore } from "../../stores/rootStore";

const StyledHeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Score = styled.div`
  opacity: 0.8;
  font-size: 18px;
`;

@observer
export class HeaderRight extends React.Component {
  render() {
    const { blocksStore, mainViewStore } = rootStore;
    return (
      <StyledHeaderRight>
        <ButtonGroup columnGap={15}>
          <Score>
            <b>Score:</b> {"2d 15h 42m 11s"}
          </Score>
          <Toggle
            checked={blocksStore.blockOn}
            onChange={(e) =>
              e.target.checked
                ? blocksStore.startBlock([])
                : blocksStore.stopBlock()
            }
          />
          <FaCog
            size={18}
            style={{ cursor: "pointer" }}
            onClick={() => mainViewStore.toggleSettingsOpened()}
          />
        </ButtonGroup>
      </StyledHeaderRight>
    );
  }
}
