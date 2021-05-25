import { IDropdownOption } from "@fluentui/react";

export const toDropdownOptions = (
  arr: string[],
  textReformer?: (text: string) => string
): IDropdownOption[] => {
  return arr.map((el) => ({
    key: el,
    text: textReformer ? textReformer(el) : el,
  }));
};
