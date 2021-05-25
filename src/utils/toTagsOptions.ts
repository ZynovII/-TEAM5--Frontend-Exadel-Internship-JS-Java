import { ITag } from "@fluentui/react";

export const toTagsOptions = (arr: string[]): ITag[] => {
  return arr.map((el) => ({
    key: el.toLowerCase(),
    text: el,
    name: el,
  }));
};
