import { BlocksStore } from "../blocksStore";
import { IpcStore } from "../ipcStore";
import { RootStore } from "../rootStore";
import { ipcRenderer } from "../../__mocks__/electron";
import { wait } from "../../utils/async";

afterEach(() => {
  ipcRenderer.invoke.mockReset();
});

it("invokes ipcRenderer", () => {
  const ipc = IpcStore.create({});
  ipc.invoke("room", "value");
  expect(ipcRenderer.invoke).toBeCalledWith("room", "value");
});
