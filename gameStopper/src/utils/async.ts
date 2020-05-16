import { when } from "mobx";

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
};

export const wait = (predicate: () => any) => {
  return new Promise((resolve) => {
    when(predicate, () => resolve());
  });
};
