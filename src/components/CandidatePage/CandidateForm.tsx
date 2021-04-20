import React from "react";
import {
  TextField,
  Stack,
  mergeStyleSets,
} from "@fluentui/react";

export const CandidateForm: React.FC<any> = (props) => { //Добавь интерфейс

return (
  <>
          <Stack
            className={contentStyles.formWrapper}
            horizontal
            tokens={{ childrenGap: "40px" }}
          >
            <Stack
              tokens={{ childrenGap: "20px" }}
              styles={{ root: { width: "450px" } }}
            >
              <TextField
                label="First name and last name"
                value={props.candidat.fullName}
              />
              <TextField label="Email" value={props.candidat.email} />
              <TextField label="Telephone" value={props.candidat.phoneNumber} />
            </Stack>
            <Stack
              tokens={{ childrenGap: "20px" }}
              styles={{ root: { width: "450px" } }}
            >
              <TextField label="Skils" value={props.candidat.technology} />
              <TextField label="Country" value={props.candidat.country} />
              <TextField label="Town" value={props.candidat.city} />
            </Stack>
          </Stack>
          <Stack
            className={contentStyles.formWrapper}
            horizontal
            tokens={{ childrenGap: "70px" }}
          >
            <TextField
              label="Informaiton"
              multiline
              autoAdjustHeight
              styles={{ root: { width: "100%" } }}
            />
          </Stack>
          </>
)
}

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
    margin: "2em",
  },
});
