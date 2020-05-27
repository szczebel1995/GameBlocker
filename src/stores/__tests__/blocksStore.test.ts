import { BlocksStore } from "../blocksStore";
import { wait } from "../../utils/async";
import { types } from "mobx-state-tree";

// jest.mock("electron");

afterEach(() => {
  // ipcRenderer.invoke.mockReset();
});
const RootStore = types.model({
  blocksStore: BlocksStore,
});

const initStores = async (blocks?: { [key: string]: string }) => {
  const ipcStore = { invoke: jest.fn(() => Promise.resolve({})) };
  ipcStore.invoke.mockResolvedValueOnce(blocks ? blocks : {});

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

      expect(env.ipc.invoke).toBeCalledWith("getBlocks", "");
      expect(rootStore.blocksStore.blockOn).toBe(false);
    });

    it("set blockOn to true when there are blocks", async () => {
      const { env, rootStore } = await initStores({ "0": "something" });

      expect(env.ipc.invoke).toBeCalledWith("getBlocks", "");
      expect(rootStore.blocksStore.blockOn).toBe(true);
    });
  });
});

describe("correctly blocks and unblocks", () => {
  const exes = ["ManifoldGarden.exe"];

  it("blocks exes", async () => {
    const { env, rootStore } = await initStores();
    expect(rootStore.blocksStore.blockOn).toBe(false);

    env.ipc.invoke.mockResolvedValueOnce({});
    await rootStore.blocksStore.startBlock(exes);

    expect(env.ipc.invoke).toHaveBeenLastCalledWith("addBlocks", exes);
    expect(rootStore.blocksStore.blockOn).toBe(true);
  });

  it("aborts block when received error from main", async () => {
    const { env, rootStore } = await initStores();

    const err = new Error("eeoo");
    env.ipc.invoke.mockResolvedValueOnce(err);

    await expect(rootStore.blocksStore.startBlock(exes)).rejects.toThrow(err);
    expect(rootStore.blocksStore.blockOn).toBe(false);
  });

  it("unblocks exes", async () => {
    const { env, rootStore } = await initStores({ "0": "something" });
    expect(rootStore.blocksStore.blockOn).toBe(true);

    env.ipc.invoke.mockResolvedValueOnce({});
    await rootStore.blocksStore.stopBlock();

    expect(env.ipc.invoke).toHaveBeenLastCalledWith("removeBlocks", undefined);
    expect(rootStore.blocksStore.blockOn).toBe(false);
  });

  it("aborts unblock when received error from main", async () => {
    const { env, rootStore } = await initStores({ "0": "something" });
    expect(rootStore.blocksStore.blockOn).toBe(true);

    const err = new Error("eeoo");
    env.ipc.invoke.mockResolvedValueOnce(err);

    await expect(rootStore.blocksStore.stopBlock()).rejects.toThrow(err);
    expect(rootStore.blocksStore.blockOn).toBe(true);
  });
});
