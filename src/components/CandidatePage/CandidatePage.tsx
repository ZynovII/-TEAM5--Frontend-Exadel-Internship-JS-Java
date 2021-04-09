import React from 'react'
import { 
    TextField,
    Stack, 
    mergeStyleSets,
    Dropdown,
    IDropdownOption,
    Calendar, 
    ProgressIndicator, DatePicker
   } from '@fluentui/react/lib';
   
   
export interface ICandidat{
    id: number;
    fullName: string;
    email: string;
    telephone: number;
    country: string;
    town: string;
    skils: object[];
    info: string;
}

export interface ICandidatProps {
    candidat: ICandidat;
}

const options: object[] = [
    { key: 'Interview', text: 'Interview' },
    { key: 'HR', text: 'HR' },
    { key: 'TS', text: 'TS' },  
];

const desicion: IDropdownOption[] = [
    { key: 'Accept', text: 'Accept' },
    { key: 'Reject', text: 'Reject' },
];

const dayPickerStrings = {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    goToToday: 'Go to today',
    weekNumberFormatString: 'Week number {0}',
    prevMonthAriaLabel: 'Previous month',
    nextMonthAriaLabel: 'Next month',
    prevYearAriaLabel: 'Previous year',
    nextYearAriaLabel: 'Next year',
    prevYearRangeAriaLabel: 'Previous year range',
    nextYearRangeAriaLabel: 'Next year range',
    closeButtonAriaLabel: 'Close',
    monthPickerHeaderAriaLabel: '{0}, select to change the year',
    yearPickerHeaderAriaLabel: '{0}, select to change the month',
};

const time = [
    {
        key: 1, text: '09:00-09:30',
    },
    {
        key: 2, text: '10:00-10:30',
    },
    {
        key: 3, text: '10:30-11:00',
    },
    {
        key: 4, text: '11:00-11:30',
    },
    {
        key: 5, text: '12:00-12:30',
    },
    {
        key: 6, text: '13:00-13:30',
    },
    {
        key: 7, text: '14:00-14:30',
    },
    {
        key: 8, text: '15:00-15:30',
    },
  ]

const filterDisplay = {
	display: "flex",
	justifyContent: "space-between",
    //position: 'absolute',
    marginTop: -21,
    zIndex: 1,
} as const;




export const CandidatePage: React.FC<ICandidatProps> = (props) => {
    
    return (
        <div className={contentStyles.container}>
            <div><h1>Welcome, {props.candidat.fullName}</h1></div>
            <div>
                <h1>Internship JS&amp;Java</h1>
                <Stack className={contentStyles.formWrapper} horizontal tokens={{ childrenGap: '40px' }}>
                    <Stack tokens= { {childrenGap: '10px'}} styles = {{root:{width:'220px'}}}  >
                        <TextField value="Pending"/>
                    </Stack>
                    <Stack tokens= { {childrenGap: '0px'}} styles = {{root:{width:'520px',}}}  >
                        <div style={filterDisplay}>
                            <p>Registered</p>
                            <p>Waiting HR</p>
                            <p>Waiting TS</p>
                            <p>Waiting desicion</p>
                        </div>
                        <ProgressIndicator barHeight={20} percentComplete={0.4} styles = {{root:{position:'relative',}}}/>
                    </Stack>
                    <Stack tokens= { {childrenGap: '20px'}} styles = {{root:{width:'220px',}}}  >
                        <Dropdown placeholder="Select a desition" options={desicion} styles = {{root:{width:'220px',}}}/>
                    </Stack>
                </Stack>
                <Stack className={contentStyles.formWrapper} horizontal tokens={{ childrenGap: '40px' }} >
                    <Stack tokens= { {childrenGap: '20px'}} styles = {{root:{width:'450px',}}}  >
                        <TextField label="First name and last name" value={props.candidat.fullName} />
                        <TextField label="Email" value={props.candidat.email}/>
                        <TextField label="Telephone" value={props.candidat.telephone} />                    
                    </Stack>
                    <Stack tokens= { {childrenGap: '20px'}} styles = {{root:{width:'450px',}}}  >
                        <TextField label="Skils" value="Java" />
                        <TextField label="Country" value={props.candidat.country} />
                        <TextField label="Town" value={props.candidat.town} />
                    </Stack>                  
                </Stack>
                <Stack className={contentStyles.formWrapper} horizontal tokens={{ childrenGap: '70px' }} >
                    <TextField label="Informaiton" multiline autoAdjustHeight styles = {{root:{width:'100%',}}}/>
                </Stack>
            </div>
            <div>
                <h1>To set up iterview</h1>
                <Stack className={contentStyles.formWrapper} horizontal tokens={{ childrenGap: '40px' }} >
                    <Stack tokens= { {childrenGap: '40px'}} styles = {{root:{width:'520px',}}}  >
                        <Dropdown placeholder="Select an option" label="Select type of interview" options={options}/>
                    </Stack>
                    <Stack tokens= { {childrenGap: '0px'}} styles = {{root:{width:'520px',}}}  >
                        <DatePicker
                            label="Chosen date "
                            showMonthPickerAsOverlay={true}
                            strings={dayPickerStrings}
                            placeholder="Select a date..."
                            ariaLabel="Select a date"
                        />           
                    </Stack>
                    <Stack tokens= { {childrenGap: '20px'}} styles = {{root:{width:'520px',}}}  >
                        <Dropdown label="Chosen tine " placeholder="Select an option" options={time} />
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