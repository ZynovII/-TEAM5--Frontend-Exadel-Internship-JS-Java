import React, { useMemo, useState } from "react";
import {
  Stack,
  ProgressIndicator,
  mergeStyleSets,
  IDropdownOption,
  DefaultButton,
} from "@fluentui/react";
import { useForm } from "react-hook-form";
import { ControlledDropdown } from "../../hook-form/Controlled";
import {
  AcceptStatus,
  IApplicant,
  InterviewStatus,
} from "../../models/IApplicant";
import { useApplicants } from "../../hooks/useApplicants";
import { useAuth } from "../../hooks/useAuth";

import { useIsMountedRef } from "../../hooks/useIsMounted";

const desicion: IDropdownOption[] = [
  { key: AcceptStatus.Accepted, text: "Accept" },
  { key: AcceptStatus.Rejected, text: "Reject" },
];

export const StatusForm: React.FC<{ candidat: IApplicant }> = ({candidat}) => {
  const isMountedRef = useIsMountedRef();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    reValidateMode: "onSubmit",
    mode: "all",
  });
  const { setStatus } = useApplicants();
  const { currentUser } = useAuth();
  const [statusAplicant, setStatusAplicant] = useState(candidat.status);
  const interviewProcess = useMemo(() => {
    switch (candidat.interviewProcess) {
      case InterviewStatus.Registered:
        return [0, 'Registered'];
      case InterviewStatus.AwaitingHRInterview:
        return [0.33, 'HR Interview'];
      case InterviewStatus.AwaitingTSInterview:
        return [0.66, 'TS Interview'];
      case InterviewStatus.WaitingDecision:
        return [1, 'Waiting Desicion'];
      default:
        return [0, 'Registered'];
    }
  }, [candidat.interviewProcess]);
  const textAlign = useMemo(() => {
    return interviewProcess[0] <= 0.2 ? { textAlign: 'left' } : { textAlign: 'right' }
  }, [interviewProcess[0]])

  const onSave = () => {
    handleSubmit((data) => {
    switch(data.status.join()) {
      case 'GREEN':  
        setStatus(`${candidat.id}/accept`) 
        .then((response) => {
          if (isMountedRef.current) {
            setStatusAplicant(response)
          }
        })
        return
      case 'RED':  
        setStatus(`${candidat.id}/reject`)
        .then((response) => {
          if (isMountedRef.current) {
            setStatusAplicant(response)
          }
        })
        return
      default:
        setStatus(`${candidat.id}/accept`)
        .then((response) => {
          if (isMountedRef.current) {
            setStatusAplicant(response)
          }
        })
      return
    }
  })();
  };
  return (
    <Stack
      className={contentStyles.formWrapper}
      horizontal
      tokens={{ childrenGap: "40px" }}
    >
      <Stack
        tokens={{ childrenGap: "10px" }}
        styles={{ root: { width: "20%" } }}
      >
        <h3
          style={{
            color:
              (statusAplicant === AcceptStatus.Accepted &&
                "#00cc00") ||
              (statusAplicant === AcceptStatus.Pending &&
                "#DBDE36") ||
              (statusAplicant === AcceptStatus.Rejected &&
                "red"),
          }}
        >
          {statusAplicant}
        </h3>
      </Stack>
      <Stack
        tokens={{ childrenGap: "0px" }}
        styles={{ root: { width: "50%" } }}
      >
        <ProgressIndicator
          barHeight={20}
          percentComplete={+interviewProcess[0]}
          label={interviewProcess[1]}
          styles={{
            itemName: {
              minWidth: '18%',
              width: +interviewProcess[0] * 100 + '%',
              ...textAlign
            },
          }}
        />
      </Stack>
      <Stack
        styles={{
          root: {
            flexFlow: "row nowrap",
            justifyContent: "space-around",
            width: "30%",
          },
        }}
      >
        <ControlledDropdown
          control={control}
          name={"status"}
          placeholder="Choose Status"
          defaultSelectedKey={""}
          errors={errors}
          options={desicion}
          style={{ width: "150px" }}
          disabled= {currentUser.role !== "SUPERADMIN"}
        />
        <DefaultButton 
          text="Submit" 
          onClick={() => onSave()} 
          disabled={currentUser.role !== "SUPERADMIN"}
        />
      </Stack>
    </Stack>
  );
};

const contentStyles = mergeStyleSets({
  formWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: '1em'
  },
});
