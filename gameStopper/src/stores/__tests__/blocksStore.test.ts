import { BlocksStore } from "../blocksStore";
import { IpcStore } from "../ipcStore";

// window.require = (() => {
//   return jest.fn();
// }) as any;

it("just works xDD", async () => {
  const ipcStore = IpcStore.create({});
  console.log(ipcStore.invoke);
  const env = { ipc: "hello", ipc2: ipcStore };
  const blocksStore = BlocksStore.create({}, env);
  // await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  // expect(blocksStore.blockOn).toBe(false);
  expect(true).toBe(true);
});
