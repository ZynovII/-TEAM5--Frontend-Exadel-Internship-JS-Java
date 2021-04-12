import React from "react";
import {Label,Stack, } from "@fluentui/react";
import {ITagPickerItemProps} from "./Models"
import {
  TagPicker,
  ITag,
  IBasePickerSuggestionsProps,
  IBasePickerStyles,
  IBasePickerStyleProps,
  IStyleFunctionOrObject,
} from "@fluentui/react";
import { ControlledTagPicker } from "../../hook-form/ControlledTagPicker";

const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested tags',
  noResultsFoundText: 'No tags found',
};

const tagPickerStyles:IStyleFunctionOrObject<IBasePickerStyleProps, IBasePickerStyles> = {
  root:{
    minWidth:"300px",
    maxWidth:"500px"
  }
}



export const TagPickerItem: React.FunctionComponent<ITagPickerItemProps> = (props) => {

  const getTextFromItem = (item: ITag) => item.name;
  const eventTags = props.eventTags
  
  const listContainsTagList = (tag: ITag, tagList?: ITag[]) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.some(compareTag => compareTag.key === tag.key);
  };

  const filterSuggestedTags = (filterText: string, tagList: ITag[]): ITag[] => {
    return filterText
      ? eventTags.filter(tag => 
        tag.key.toString().indexOf(filterText.toLowerCase()) === 0 && !listContainsTagList(tag, tagList)
        ) : [];
  };

  return (
    <>
        <Stack.Item align="center" styles={{root:{margin:"0 2px"}}}>
          <Label>{props.label}</Label>
          <TagPicker
            styles={tagPickerStyles}
            removeButtonAriaLabel="Remove"
            onResolveSuggestions={filterSuggestedTags}
            getTextFromItem = {getTextFromItem}
            pickerSuggestionsProps={pickerSuggestionsProps}
            itemLimit={props.eventTags.length}
            aria-label = 'Tag picker'
          />
        </Stack.Item>
    </>
  );
};
