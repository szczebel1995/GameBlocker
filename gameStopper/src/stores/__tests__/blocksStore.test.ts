import { BlocksStore } from "../blocksStore";
import { IpcStore } from "../ipcStore";
import { ipcRenderer } from "../../__mocks__/electron";
import { when } from "mobx";
import { wait } from "../../utils/async";
import { GamesStore } from "../gamesStore";
import { MainViewStore } from "../ui/mainViewStore";
import { types } from "mobx-state-tree";

// jest.mock("electron");

afterEach(() => {
  ipcRenderer.invoke.mockReset();
});
const RootStore = types.model({
  blocksStore: BlocksStore,
});

const initStores = async (blocks?: { [key: string]: string }) => {
  ipcRenderer.invoke.mockResolvedValueOnce(blocks ? blocks : {});

  const ipcStore = IpcStore.create({});
  const env = { ipc: ipcStore };
  const rootStore = RootStore.create(
    { blocksStore: BlocksStore.create({}) },
    env
  );
  await wait(() => rootStore.blocksStore.blockOn !== undefined);
  return { env, rootStore };
};

describe("correctly initializes", () => {
  describe("gets blocks from main process on init", () => {
    it("set blockOn to false when no blocks", async () => {
      const { env, rootStore } = await initStores();

      expect(ipcRenderer.invoke).toBeCalledWith("getBlocks", "");
      expect(rootStore.blocksStore.blockOn).toBe(false);
    });

    it("set blockOn to true when there are blocks", async () => {
      const { env, rootStore } = await initStores({ "0": "something" });

      expect(ipcRenderer.invoke).toBeCalledWith("getBlocks", "");
      expect(rootStore.blocksStore.blockOn).toBe(true);
    });
  });
});

describe("correctly blocks and unblocks", () => {
  const exes = ["ManifoldGarden.exe"];

  it("blocks exes", async () => {
    const { env, rootStore } = await initStores();
    expect(rootStore.blocksStore.blockOn).toBe(false);

    ipcRenderer.invoke.mockResolvedValueOnce({});
    await rootStore.blocksStore.startBlock(exes);

    expect(ipcRenderer.invoke).toHaveBeenLastCalledWith("addBlocks", exes);
    expect(rootStore.blocksStore.blockOn).toBe(true);
  });

  it("aborts block when received error from main", async () => {
    const { env, rootStore } = await initStores();

    const err = new Error("eeoo");
    ipcRenderer.invoke.mockResolvedValueOnce(err);

    await expect(rootStore.blocksStore.startBlock(exes)).rejects.toThrow(err);
    expect(rootStore.blocksStore.blockOn).toBe(false);
  });

  it("unblocks exes", async () => {
    const { env, rootStore } = await initStores({ "0": "something" });
    expect(rootStore.blocksStore.blockOn).toBe(true);

    ipcRenderer.invoke.mockResolvedValueOnce({});
    await rootStore.blocksStore.stopBlock();

    expect(ipcRenderer.invoke).toHaveBeenLastCalledWith(
      "removeBlocks",
      undefined
    );
    expect(rootStore.blocksStore.blockOn).toBe(false);
  });

  it("aborts unblock when received error from main", async () => {
    const { env, rootStore } = await initStores({ "0": "something" });
    expect(rootStore.blocksStore.blockOn).toBe(true);

    const err = new Error("eeoo");
    ipcRenderer.invoke.mockResolvedValueOnce(err);

    await expect(rootStore.blocksStore.stopBlock()).rejects.toThrow(err);
    expect(rootStore.blocksStore.blockOn).toBe(true);
  });
});
