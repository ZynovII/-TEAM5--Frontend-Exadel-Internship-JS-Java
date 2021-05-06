import React, { useState, useEffect } from "react";
import { useLoader } from "../../hooks/hooks";
import { useApplicants } from "../../hooks/useApplicants";
import { useParams } from "react-router";
import { Spinner, SpinnerSize } from "@fluentui/react";

import {
  mergeStyleSets,
  DocumentCardActions,
} from "@fluentui/react";

import {
  AcceptStatus,
  IApplicant,
  InterviewStatus,
  PreferredTime,
} from "../../models/IApplicant";
import { Registration } from "../Registration/Registration";
import { StatusForm } from "./StatusForm";
import { InfoForm } from "./InfoForm";
import { InterviewForm } from "./InterwievForm";


export interface ICandidatProps {
  candidat: IApplicant;
}
interface RouteParams {
  id: string;
}

const candidat: IApplicant = {
  id: "aefo78a0",
  fullName: "Ivan Ivanov",
  email: "iivanov@mail.ru",
  skype: "skype ",
  phoneNumber: "+375294722147",
  country: "Belarus",
  city: "Minsk",
  technology: "Java",
  eventName: "E-learning",
  summary:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure idLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id..",
  acceptanceStatus: AcceptStatus.Accepted,
  interviewStatus: InterviewStatus.AwaitingTSInterview,
  preferredTime: PreferredTime.First,
};

export const CandidatePage: React.FC = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const params = useParams<RouteParams>();
  const {  selectedApplicant, selectApplicant } = useApplicants();
  const { loading, showLoader } = useLoader();
  useEffect(() => {
    console.log(params.id)
    showLoader()
    selectApplicant(params.id)
  }, [])

  console.log(selectedApplicant)

  return loading ? (
    <Spinner size={SpinnerSize.large} className="margin2em" />
  ) : (
    <>
      <header >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "20%",
            alignItems: "flex-end",
          }}
        >
          <h2>{selectedApplicant.fullName}</h2>
          <DocumentCardActions
            actions={[
              {
                iconProps: { iconName: "Edit" },
                ariaLabel: "edit event",
                onClick: () => setEdit(!edit),
              },
            ]}
          />
        </div>
        <h3>{selectedApplicant.eventName}</h3>
      </header>
      <div className={contentStyles.container}>
      <StatusForm candidat={candidat} />
        <div >
          {edit ? (
            <Registration candidatePage={true} candidat={candidat} />
          ) : (
            <InfoForm candidat={candidat} />
          )}
        </div>
        <InterviewForm />
      </div>
    </>
  );
};

const contentStyles = mergeStyleSets({
  
  container: {
    width: "auto",
    margin: "1em 2em",
  },
});
