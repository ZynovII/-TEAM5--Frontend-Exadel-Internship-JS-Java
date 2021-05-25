import React from "react";
import { Stack, mergeStyleSets, DefaultButton } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

import { IApplicantDetailsFromBackEnd } from "../../models/IApplicant";
import { preferredTimeReformer } from "../../utils/stringReformers";
import { useApplicants } from "../../hooks/useApplicants";
import ModalWindow from "../ModalWindow";

const modalText = `There is no candidate’s CV`;
export const InfoForm: React.FC<{ candidat: IApplicantDetailsFromBackEnd }> = ({
  candidat,
}) => {
  const { cvDownload } = useApplicants();
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    false
  );
  const download = () =>
    cvDownload(candidat.id, candidat.fullName, candidat.primaryTech).then(
      (res) => {
        res && showModal();
      }
    );
  return (
    <>
      <ModalWindow open={isModalOpen} text={modalText} hideModal={hideModal} />
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
            <p className={contentStyles.input}>{candidat.fullName}</p>
            <p className={contentStyles.input}>{candidat.email}</p>
            <p className={contentStyles.input}>
              {candidat.phone || "Phone Number"}
            </p>
            <p className={contentStyles.input}>{candidat.skype}</p>
          </Stack>
          <Stack
            tokens={{ childrenGap: "20px" }}
            styles={{ root: { width: "50%" } }}
          >
            <p className={contentStyles.input}>{candidat.primaryTech}</p>
            <p className={contentStyles.input}>{candidat.country}</p>
            <p className={contentStyles.input}>{candidat.city}</p>
            <p className={contentStyles.input}>
              {preferredTimeReformer(candidat.preferredTime)}
            </p>
          </Stack>
        </Stack>
        <p
          className={contentStyles.input}
          style={{ margin: "20px 0", minHeight: "62px", maxHeight: "100%" }}
        >
          {candidat.summary || "Summary"}
        </p>

        <DefaultButton text="Download" onClick={download} />
      </div>
    </>
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
    padding: "7px 8px",
    maxHeight: "32px",
    color: "rgb(50, 49, 48)",
    border: "1px solid rgb(96, 94, 92)",
    borderRadius: "2px",
  },
});
