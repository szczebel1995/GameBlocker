import { types } from "mobx-state-tree";

export const BlocksStore = types
  .model({
    blockOn: types.maybe(types.boolean),
  })
  .actions((self) => {
    const afterCreate = async () => {
      // console.log(await psList({ all: true }));
    };

    // const

    return {
      afterCreate,
    };
  });

export const processStore = BlocksStore.create({});
