import React, { useMemo } from 'react'
import { 
    TextField,
    Stack, 
    mergeStyleSets,
    Dropdown,
    IDropdownOption,
    ProgressIndicator, 
    getTheme
    
   } from '@fluentui/react/lib';
   
   import OperationsTable from './OperationsTable';
   import { IApplicant } from "../../models/IApplicant";

export interface IInterviewProps {
    candidat: IApplicant;
}
const theme = getTheme();

const options: object[] = [
    { key: 'Interview', text: 'Interview' },
    { key: 'HR', text: 'HR' },
    { key: 'TS', text: 'TS' },  
];

const desicion: IDropdownOption[] = [
    { key: 'Accept', text: 'Accept' },
    { key: 'Reject', text: 'Reject' },
];

const filterDisplay = {
	display: "flex",
	justifyContent: "space-between",
    //position: 'absolute',
    marginTop: -21,
    zIndex: 1,
} as const;



export const InterviewPage: React.FC<IInterviewProps> = (props) => {
    
    return (
        <div className={contentStyles.container}>
            
            <div><h1>Welcome, {props.candidat.fullName}</h1></div>
            <div>
                <Stack className={contentStyles.formWrapper} horizontal tokens={{ childrenGap: '40px' }}>
                    <Stack tokens= { {childrenGap: '10px'}} styles = {{root:{width:'220px'}}}  >
                        <p>{props.candidat.acceptanceStatus}</p>
                    </Stack>
                    <Stack tokens= { {childrenGap: '0px'}} styles = {{root:{width:'520px',}}}  >
                        <div style={filterDisplay}>
                            <p>Registered</p>
                            <p>Waiting HR</p>
                            <p>Waiting TS</p>
                            <p>Waiting desicion</p>
                        </div>
                        <ProgressIndicator barHeight={20} percentComplete={0.4} label={props.candidat.interviewStatus} styles={{
                            itemName: { paddingLeft: 4 * 100 + "%",},}}/>
                        
                    </Stack>
                    <Stack tokens= { {childrenGap: '20px'}} styles = {{root:{width:'220px',}}}  >
                        <Dropdown placeholder="Select a desition" options={desicion} styles = {{root:{width:'220px',}}}/>
                    </Stack>
                </Stack>
                <div style={{boxShadow: theme.effects.elevation64,margin: "0 auto",}}>
                    <h1 style={{paddingTop: '20px', marginLeft: '50px'}}>Internship JS &amp; Java</h1>
                    <Stack className={contentStyles.formWrapper} horizontal tokens={{ childrenGap: '40px' }} styles = {{root:{marginLeft: '50px', marginTop: '9px'}}}>
                        <Stack tokens= { {childrenGap: '5px'}} styles = {{root:{width:'450px',}}}  >
                            <p>{props.candidat.fullName}</p>
                            <p>{props.candidat.email}</p>
                            <p>{props.candidat.phoneNumber}</p>           
                        </Stack>
                        <Stack tokens= { {childrenGap: '5px'}} styles = {{root:{width:'450px',}}}  >
                            <p>{props.candidat.country}</p>
                            <p>{props.candidat.city}</p>
                            <p>{props.candidat.technology}</p>
                        </Stack>                  
                    </Stack>
                </div>
            </div>
            
            <div>
                <h1>Iterview</h1>
                <Stack className={contentStyles.formWrapper} horizontal tokens={{ childrenGap: '40px' }} >
                    <Stack tokens= { {childrenGap: '20px'}} styles = {{root:{width:'100%',}}}  >
                        <OperationsTable />

                    </Stack>                  
                </Stack>
            </div>
        </div>
      
    );
};
  

const contentStyles = mergeStyleSets({
    formWrapper: {
      display: 'flex',
      justifyContent:'space-between',
      alignItems: 'stretch',
    },

    container:{
        width: '73%', 
        margin:'2em auto'
      },
  
});