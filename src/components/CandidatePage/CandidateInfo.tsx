import React from 'react'
import { ICandidat, CandidatePage} from './CandidatePage' 



const candidat = [{
    id: 1,
    fullName: "Ivan Ivanov",
    email: "iivanov@mail.ru",
    telephone: 375294722147,
    country: "Belarus",
    town: "Minsk",
    skils: [{key: 'Java', text: 'Java'}, {key: 'Js', text: 'DevOps'}],
    info: "",
}
]

export const CandidatInfo : React.FC = ()=> {
    return (
        <section >
            {candidat.map((obj: ICandidat)=><div><CandidatePage key={obj.id} candidat={obj}/></div>)}
         </section>
        );
}
export default CandidatInfo