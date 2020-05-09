import { types } from "mobx-state-tree";
import psList from "ps-list";

export const ProcessStore = types.model({}).actions((self) => {
  const afterCreate = async () => {
    // console.log(await psList({ all: true }));
  };

  return {
    afterCreate,
  };
});

export const processStore = ProcessStore.create({});
