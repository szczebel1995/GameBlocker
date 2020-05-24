import * as regedit from "regedit";
import { types } from "util";

const explorerExist = async () => {
  const policies: any = await new Promise((resolve) => {
    regedit.list(
      "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES",
      (err: any, res: any) => resolve(err ? err : res)
    );
  });
  const realPolicies =
    policies["HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES"]
      .keys;
  return (
    !types.isNativeError(policies) &&
    realPolicies &&
    realPolicies.includes("Explorer")
  );
};

const blocksExist = async () => {
  const blocks = await new Promise((resolve) => {
    regedit.list(
      "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES\\EXPLORER\\DISALLOWRUN",
      (err, res) => resolve(err ? err : res)
    );
  });
  return !types.isNativeError(blocks);
};

const createBlocksBase = async () => {
  const explorerErr = await new Promise((resolve) => {
    regedit.createKey(
      "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES\\Explorer",
      (err) => resolve(err)
    );
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
        "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES\\Explorer": {
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
    regedit.createKey(
      "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES\\EXPLORER\\DisallowRun",
      (err) => resolve(err)
    );
  });
};

export const getBlocks = async () => {
  const blocks: any = await new Promise((resolve) => {
    regedit.list(
      "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES\\EXPLORER\\DISALLOWRUN",
      (err, res) => resolve(err ? err : res)
    );
  });
  const realBlocks =
    blocks[
      "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES\\EXPLORER\\DISALLOWRUN"
    ].values;
  return realBlocks ? Object.entries(realBlocks) : [];
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

  return await new Promise((resolve) => {
    regedit.putValue(
      {
        "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES\\EXPLORER\\DisallowRun": values,
      },
      (err, res) => resolve(err ? err : res)
    );
  });
};

export const removeAllBlocks = async () => {
  return new Promise((resolve) =>
    regedit.deleteKey(
      "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\POLICIES\\EXPLORER\\DISALLOWRUN",
      (err, res) => resolve(err ? err : res)
    )
  );
};
