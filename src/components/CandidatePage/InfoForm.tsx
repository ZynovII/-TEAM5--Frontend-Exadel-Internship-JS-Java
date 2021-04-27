import React from "react";
import { Stack, mergeStyleSets, DefaultButton } from "@fluentui/react";
import { IApplicant } from "../../models/IApplicant";
import { preferredTimeReformer } from "../../utils/stringReformers";


export const InfoForm: React.FC<{ candidat: IApplicant }> = (props) => {
  return (
    <div className={contentStyles.container}>
      <Stack
        className={contentStyles.formWrapper}
        horizontal
        tokens={{ childrenGap: "40px" }}
      >
        <Stack
          tokens={{ childrenGap: "20px" }}
          styles={{ root: { width: "50%" } }}
        >
          <p className={contentStyles.input}>{props.candidat.fullName}</p>
          <p className={contentStyles.input}>{props.candidat.email}</p>
          <p className={contentStyles.input}>{props.candidat.phoneNumber}</p>
          <p className={contentStyles.input}>{props.candidat.skype}</p>
        </Stack>
        <Stack
          tokens={{ childrenGap: "20px" }}
          styles={{ root: { width: "50%" } }}
        >
          <p className={contentStyles.input}>{props.candidat.technology}</p>
          <p className={contentStyles.input}>{props.candidat.country}</p>
          <p className={contentStyles.input}>{props.candidat.city}</p>
          <p className={contentStyles.input}>{preferredTimeReformer(props.candidat.preferredTime)}</p>
        </Stack>
      </Stack>
      <p
        className={contentStyles.input}
        style={{ margin: "20px 0", minHeight: "62px", maxHeight: "100%" }}
      >
        {props.candidat.summary}
      </p>

      <DefaultButton text="Download" />
    </div>
  );
};

const contentStyles = mergeStyleSets({
  formWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginTop: "2rem",
  },

  container: {
    margin: "3rem auto",
  },

  input: {
    backgroundColor: "white",
    fontSize: "14px",
    padding: "8px",
    maxHeight: "32px",
    color: "rgb(50, 49, 48)",
    font: "400 13.3333px Arial",
    border: "1px solid rgb(96, 94, 92)",
    borderRadius: "2px",
  },
});
