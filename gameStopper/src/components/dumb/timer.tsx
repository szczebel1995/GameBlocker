import * as React from "react";
import { craftTimerString } from "../../utils/time";

export interface ITimerProps {
  startTimestamp: number;
}

export class Timer extends React.Component<ITimerProps, { timestamp: number }> {
  interval: any;

  constructor(props: ITimerProps) {
    super(props);

    this.state = { timestamp: Date.now() - props.startTimestamp };
  }

  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.setState((prevState) => ({
          ...prevState,
          timestamp: prevState.timestamp + 1000,
        })),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <span>{craftTimerString(this.state.timestamp)}</span>;
  }
}
