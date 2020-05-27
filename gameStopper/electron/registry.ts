import * as regedit from "regedit";
import { types } from "util";
import * as path from "path";
import { app } from "electron";

// TODO: this one is messy and rushed, clean up and make a store out of it

const policiesRegPath =
  "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES";

export const setScriptsFolder = () => {
  const vbsDirectory = path.join(
    path.dirname(app.getPath("exe")),
    "./resources/my-location"
  );
  regedit.setExternalVBSLocation(vbsDirectory);
};

const explorerExist = async () => {
  const policies: any = await new Promise((resolve) => {
    regedit.list(`${policiesRegPath}`, (err: any, res: any) =>
      resolve(err ? err : res)
    );
  });
  const realPolicies = policies[policiesRegPath].keys;
  return (
    !types.isNativeError(policies) &&
    realPolicies &&
    realPolicies.includes("Explorer")
  );
};

const blocksExist = async () => {
  const blocks = await new Promise((resolve) => {
    regedit.list(`${policiesRegPath}\\EXPLORER\\DISALLOWRUN`, (err, res) =>
      resolve(err ? err : res)
    );
  });
  return !types.isNativeError(blocks);
};

const createBlocksBase = async () => {
  const explorerErr = await new Promise((resolve) => {
    regedit.createKey(`${policiesRegPath}\\Explorer`, (err) => resolve(err));
  });

  if (types.isNativeError(explorerErr)) {
    return explorerErr;
  }

  const explorerCreated: any = await explorerExist();
  if (!explorerCreated) {
    return new Error("failed to create Explorer");
  }

  const disallowRunErr = await new Promise((resolve) => {
    regedit.putValue(
      {
        [`${policiesRegPath}\\Explorer`]: {
          DisallowRun: {
            value: 1,
            type: "REG_DWORD",
          },
        },
      },
      (err, res) => resolve(err ? err : res)
    );
  });

  if (types.isNativeError(disallowRunErr)) {
    return disallowRunErr;
  }

  return createBlocksKey();
};

const createBlocksKey = () => {
  return new Promise((resolve) => {
    regedit.createKey(`${policiesRegPath}\\EXPLORER\\DisallowRun`, (err) =>
      resolve(err)
    );
  });
};

export const getBlocks = async () => {
  const blocks: any = await new Promise((resolve) => {
    regedit.list(`${policiesRegPath}\\EXPLORER\\DISALLOWRUN`, (err, res) =>
      resolve(err ? err : res)
    );
  });
  const realBlocks = blocks[`${policiesRegPath}\\EXPLORER\\DISALLOWRUN`];
  return realBlocks && realBlocks.values
    ? Object.entries(realBlocks.values)
    : [];
};

export const addBlocks = async (exes: string[]) => {
  if (!(await explorerExist())) {
    const err1 = await createBlocksBase();
    if (types.isNativeError(err1)) {
      return err1;
    }
  }

  if (!(await blocksExist())) {
    const err = await createBlocksKey();
    if (types.isNativeError(err)) {
      return err;
    }
  }

  const blocks = await getBlocks();

  const values = {};
  exes.forEach(
    (exe, i) => (values[blocks.length + 1 + i] = { value: exe, type: "REG_SZ" })
  );
  values["blockStartTimestamp"] = { value: `${Date.now()}`, type: "REG_SZ" };

  return await new Promise((resolve) => {
    regedit.putValue(
      {
        [`${policiesRegPath}\\EXPLORER\\DisallowRun`]: values,
      },
      (err, res) => resolve(err ? err : res)
    );
  });
};

export const removeAllBlocks = async () => {
  return new Promise((resolve) =>
    regedit.deleteKey(`${policiesRegPath}\\EXPLORER\\DISALLOWRUN`, (err, res) =>
      resolve(err ? err : res)
    )
  );
};
