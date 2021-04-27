import React from 'react'
import { InterviewPage} from './InterviewPage' 
import { IApplicant, AcceptStatus, InterviewStatus } from "../../models/IApplicant";


const candidat = [{
    id: 1,
    fullName: "Ivan Ivanov",
    email: "iivanov@mail.ru",
    skype: " ",
    phoneNumber: "+375294722147",
    country: "Belarus",
    city: "Minsk",
    technology: ['Java', 'DevOps'],
    events:[123, 234],
    summary: " ",
    acceptanceStatus: AcceptStatus.Accepted,
    interviewStatus: InterviewStatus.AwaitingHRInterview,
    assignedHRID: 111,
    assignedTSID: 999,
    HRFeedback: "",
    TSFeedback: "",
}
]

export const InterviewInfo : React.FC = (props)=> {
    return (
        <section >
            {candidat.map((obj: IApplicant)=><div><InterviewPage key={obj.id} candidat={obj}/></div>)}
         </section>
        );
}
export default InterviewInfo