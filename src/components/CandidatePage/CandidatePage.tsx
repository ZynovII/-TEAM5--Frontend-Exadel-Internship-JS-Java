import React, { useState } from "react";
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
import ScrollBar from '../UI/Scrollbar/Scrollbar'
import { InterviewForm } from "./InterwievForm";


export interface ICandidatProps {
  candidat: IApplicant;
}

const candidat: IApplicant = {
  id: "aefo78a0",
  fullName: "Ivan Ivanov",
  email: "iivanov@mail.ru",
  skype: " skype ",
  phoneNumber: "+375294722147",
  country: "Belarus",
  city: "Minsk",
  technology: "Java",
  eventName: "E-learning",
  summary:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure idLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure libero optio fuga nostrum animi alias accusantium exercitationem natus consectetur placeat, totam, consequatur ea! Consequatur saepe cupiditate dicta iure id..",
  acceptanceStatus: AcceptStatus.Accepted,
  interviewStatus: InterviewStatus.Desicion,
  preferredTime: PreferredTime.First,
};

export const CandidatePage: React.FC = () => {
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <>
      <header className={contentStyles.title}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "20%",
            alignItems: "flex-end",
          }}
        >
          <h2>{candidat.fullName}</h2>
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
        <h3>Internship JS&amp;Java</h3>
      </header>
      <div className={contentStyles.container}>
      <StatusForm candidat={candidat} />

      <ScrollBar height="62vh"> 
        <div style={{margin:'0 1em'}}>
          {edit ? (
            <Registration candidatePage={true} candidat={candidat} />
          ) : (
            <InfoForm candidat={candidat} />
          )}
        </div>
        <InterviewForm />
        </ScrollBar>
      </div>
    </>
  );
};

const contentStyles = mergeStyleSets({
  title: {
    margin: "0 2em",
  },
  container: {
    width: "auto",
    margin: "1em 2em",
  },
});
