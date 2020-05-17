import { EnvStore } from "../envStore";
import { IpcStore } from "../ipcStore";
import { LocalDbStore } from "../storage/localDbStore";

it("initialize without error", async () => {
  const env = EnvStore.create({
    ipc: IpcStore.create({}),
    db: LocalDbStore.create({}),
  });
  expect(env).toBeDefined();
});
