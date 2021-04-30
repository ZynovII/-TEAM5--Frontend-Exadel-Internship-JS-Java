import React from "react";

import {
  PrimaryButton,
  FontIcon,
  mergeStyleSets,
  ITextFieldStyleProps,
  ITextFieldStyles,
} from "@fluentui/react/lib";

import { ControlledTextField } from "../../hook-form/Controlled";

export const FeedbackForm = (props) => {
  return (
    <>
      <div>
        <h3 className={contentStyles.title}>
          Feedback
          <FontIcon iconName="Edit" className={contentStyles.icon} />
        </h3>
      </div>
      <ControlledTextField
        placeholder="Text a comment"
        control={props.control}
        name={"feedback"}
        errors={props.errors}
        styles={textFieldStyles}
        multiline
        autoAdjustHeight
        resizable={false}
        rules={{
          required: "This field is required",
        }}
      />
      <PrimaryButton className="button  " text="Save" onClick={props.onSave} />
    </>
  );
};

const contentStyles = mergeStyleSets({
  icon: {
    fontSize: 16,
    marginLeft: "0.5rem",
  },
  title: {
    margin: "0 0 1rem 0",
  },
});

const textFieldStyles = (
  props: ITextFieldStyleProps
): Partial<ITextFieldStyles> => ({
  ...{
    errorMessage: {
      backgroundColor: "transparent",
      position: "absolute",
      paddingTop: "0px",
    },
    root: {
      width: "100%",
      backgroundColor: "transparent",
      marginBottom: "1rem",
    },
    field: {
      height: "7rem",
    },
  },
});
