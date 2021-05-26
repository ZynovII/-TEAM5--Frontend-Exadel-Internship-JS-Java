import { IDropdownOption } from "@fluentui/react";

export const toDropdownOptions = (
  arr: string[],
  textReformer?: (text: string) => string
): IDropdownOption<IDropdownOption>[] => {
  const defaultOption: IDropdownOption = { key: "", text: "All" };
  const incomingOptions = arr.map((el) => ({
    key: el,
    text: textReformer ? textReformer(el) : el,
  }));
  return [defaultOption, ...incomingOptions];
};
