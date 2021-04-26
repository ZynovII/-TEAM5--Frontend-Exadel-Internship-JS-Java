import React from "react";

import {
  PrimaryButton,
  FontIcon,
  mergeStyles,
  ITextFieldStyleProps,
  ITextFieldStyles,
} from "@fluentui/react/lib";

import { ControlledTextField } from "../../hook-form/Controlled";

export const FeedbackForm = (props) => {
  return (
    <>
      <div>
        <h3>
          Feedback
          <FontIcon iconName="Edit" className={iconClass}></FontIcon>{" "}
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
          pattern: {
            value: /^.{1,500}$/,
            message: "length limit exceeded",
          },
        }}
      />
      <PrimaryButton className="button  " text="Save" onClick={props.onSave} />
    </>
  );
};

const iconClass = mergeStyles({
  fontSize: 16,

  margin: "0 0 0 10px",
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
    },
    field: {
      height: "7rem",
    },
  },
});
