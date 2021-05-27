import React, { useEffect, useState } from "react";
import {
  Stack,
  PrimaryButton,
  mergeStyleSets,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import { useForm } from "react-hook-form";
import {
  ControlledDropdown,
  ControlledDatePicker,
} from "../../hook-form/Controlled";
import { useInterviews } from "../../hooks/useInterviews";
import { useApplicants } from "../../hooks/useApplicants";
import { dateReformer } from "../../utils/stringReformers";
import { IApplicantDetailsFromBackEnd } from "../../models/IApplicant";
import ModalWindow from "../ModalWindow";
import { useBoolean } from "@fluentui/react-hooks";
import { useLoader } from "../../hooks/hooks";

const time = [
  {
    key: "09:00-10:00",
    text: "09:00-10:00",
  },
  {
    key: "10:00-11:00",
    text: "10:00-11:00",
  },
  {
    key: "11:00-12:00",
    text: "11:00-12:00",
  },
  {
    key: "12:00-13:00",
    text: "12:00-13:00",
  },
  {
    key: "13:00-14:00",
    text: "13:00-14:00",
  },
  {
    key: "14:00-15:00",
    text: "14:00-15:00",
  },
  {
    key: "15:00-16:00",
    text: "15:00-16:00",
  },
  {
    key: "16:00-17:00",
    text: "16:00-17:00",
  },
  {
    key: "17:00-18:00",
    text: "17:00-18:00",
  },
];
export const InterviewForm: React.FC<{
  candidat: IApplicantDetailsFromBackEnd;
}> = ({ candidat }) => {
  const {
    getRoles,
    getInterviewers,
    interviewers,
    createInterviews,
    checkTimeSlot,
  } = useInterviews();
  const { interviewsStatus, selectApplicant } = useApplicants();
  const [roles, setRoles] = useState();
  const [interviewer, setInterviewer] = useState([]);
  const [disabledInterviewer, setDisabledInterviewer] = useState<boolean>(true);
  const [freeSlot, setFreeSlot] = useState([]);
  const [fullFreeSlot, setFullFreeSlot] = useState([]);
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    false
  );
  const [resultOption, setResultOption] = useState([]);
  const [response, setResponse] = useState<string>("");

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    reValidateMode: "onSubmit",
    mode: "all",
  });
  const getRole = () => {
    getRoles().then((res) =>
      setRoles(
        res.slice(0, length - 1).map((el) => {
          switch (el) {
            case "ADMIN":
              return { key: el, text: "HR" };
            case "TECH":
              return { key: el, text: "TS" };
            default:
              return { key: el, text: el };
          }
        })
      )
    );
  };
  useEffect(() => {
    getRole();
    getInterviewers();
  }, []);

  const freeTimeSlot = (id) => {
    checkTimeSlot(id).then((res) => {
      setFullFreeSlot(res);
    });
  };
  const filterTime = (e) => {
    const slot = fullFreeSlot
      .map((item) => {
        if (dateReformer(item).toString() === dateReformer(e).toString()) {
          return `${new Date(item).getHours()}:00-${
            new Date(item).getHours() + 1
          }:00`;
        } else {
          return "";
        }
      })
      .filter((item) => {
        return item != "";
      });
    setFreeSlot(slot);
  };
  useEffect(() => {
    const result = time.map((el) => {
      return {
        ...el,
        disabled: freeSlot.includes(el.key),
      };
    });
    setResultOption(result);
  }, [freeSlot]);

  const onSend = (candidate) => {
    handleSubmit((data) => {
      const timeString = data.timeInterview.join();
      const startTime = +timeString.slice(0, 2) + 3 + ":00";
      const startDate = new Date(
        data.dateInterview.toString().replace(/00:00/, startTime)
      );
      createInterviews(candidate, data.interviewer[0], startDate).then(
        (res) => {
          setResponse(res);
          showModal();
          const type = data.typeInterview.toString() === "ADMIN" ? "hr" : "tc";
          interviewsStatus(candidate, type).then(() =>
            selectApplicant(candidate)
          );
          getRole();
          setDisabledInterviewer(true);
          setInterviewer([]);
          setFreeSlot([]);
        }
      );
    })();
  };

  const selectInterviewers = (type) => {
    const option = interviewers
      .filter((el) => {
        if (type === "ADMIN") {
          console.log(el.name.includes("ROLE_SUPERADMIN"));
          return el.name.includes(type) || el.name.includes("ROLE_SUPERADMIN");
        }
        return el.name.includes(type);
      })
      .map((item) => {
        return item.employees;
      })
      .flat(1);
    setInterviewer(option.map((el) => ({ key: el.id, text: el.fullName })));
  };

  return (
    <>
      <ModalWindow open={isModalOpen} text={response} hideModal={hideModal} />
      <div>
        <h1 style={{ margin: "0.5em 0" }}>To set up iterview</h1>
        <Stack
          className={contentStyles.formWrapper}
          horizontal
          tokens={{ childrenGap: "40px" }}
        >
          <Stack
            tokens={{ childrenGap: "40px" }}
            styles={{ root: { width: "520px" } }}
          >
            <ControlledDropdown
              control={control}
              label="Select type of interview"
              name={"typeInterview"}
              placeholder="Select type"
              defaultSelectedKey={""}
              errors={errors}
              options={roles}
              onChange={(e, data) => {
                setDisabledInterviewer(false);
                selectInterviewers(data.key);
              }}
              required
              rules={{ required: "This field is required" }}
            />
          </Stack>
          <Stack
            tokens={{ childrenGap: "0px" }}
            styles={{ root: { width: "520px" } }}
          >
            <ControlledDropdown
              control={control}
              label="Select Interviewer"
              name={"interviewer"}
              placeholder="Select interviewer"
              defaultSelectedKey={""}
              errors={errors}
              options={interviewer}
              disabled={disabledInterviewer}
              onChange={(e, data) => freeTimeSlot(data.key)}
              required
              rules={{ required: "This field is required" }}
            />
          </Stack>
          <Stack
            tokens={{ childrenGap: "20px" }}
            styles={{ root: { width: "520px" } }}
          >
            <ControlledDatePicker
              control={control}
              name={"dateInterview"}
              label="Select date"
              showMonthPickerAsOverlay={true}
              placeholder="Select a date..."
              ariaLabel="Select a date"
              onChange={(e) => filterTime(e)}
            />
          </Stack>
          <Stack
            tokens={{ childrenGap: "20px" }}
            styles={{ root: { width: "520px" } }}
          >
            <ControlledDropdown
              control={control}
              label="Select time"
              name={"timeInterview"}
              placeholder="Select an option"
              defaultSelectedKey={""}
              errors={errors}
              options={resultOption}
              required
              rules={{ required: "This field is required" }}
            />
          </Stack>
        </Stack>
        <PrimaryButton
          text="Appoint"
          className="margin2em button_center button"
          onClick={() => onSend(candidat.id)}
        />
      </div>
    </>
  );
};

const contentStyles = mergeStyleSets({
  formWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  title: {
    margin: "0 2em",
  },
  container: {
    width: "auto",
    margin: "1em 2em",
  },
});
