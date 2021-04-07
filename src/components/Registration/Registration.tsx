import React, { useState }  from "react"
import { 
  TextField,
  Stack, Text,
  PrimaryButton,
  ITextFieldStyleProps,
  ITextFieldStyles,
  mergeStyleSets,
  Checkbox,
  Dropdown,
  IDropdownOption, } from '@fluentui/react/lib';
  import {IRegistartionProps,IApplicant} from './models'

import { useBoolean } from "@fluentui/react-hooks";
import ModalWindow from "../ModalWindow"

const textFieldStyles = (props: ITextFieldStyleProps): Partial<ITextFieldStyles> => ({
  ...( {
    errorMessage: {
      backgroundColor:'transparent',
      position: 'absolute',
      paddingTop: '0px'
    }
  })
});

const exampleOptionsOfCities: IDropdownOption[] = [
  { key: 'minsk', text: 'Minsk' },
  { key: 'grodno', text: 'Grodno' },
  { key: 'gomel', text: 'Gomel', disabled: true },
];

{/* <Registration
        id='1' 
        name= 'Apply for Internship JS & Java' 
        country={['Russia','Belarus']}
        technology = {['js','java']}
        ></Registration> */}
        
export const Registration: React.FC<IRegistartionProps> = (props) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);

  const [registrationData, setRegistrationData] = useState<IApplicant>({
    id:'',
    fullName: '',
    email:'',
    phoneNumber: '',
    skype: '',
    technology: '',
    events:[],
    summary: '',
    country: '',
    city: '',
    }
  )

  const [countryStatus,setCountryStatus] = useState({
    disable:true
  })

  const [fileName, setFileName] = useState<string>('')

  const handleFieldChange = (event : any) => {
    const name = event.target.dataset.type
    const value = event.target.value
    console.log(event.target.dataset.type, event.target.value);
    
    setRegistrationData({...registrationData,
      [name]: value,
    });
    console.log(registrationData);
  }

  const handleDropdownChange = (event : any,item: IDropdownOption) => {
    const name = event.target.dataset.type
    const value = item.key
    
    setRegistrationData({...registrationData,
      [name]: value,
    });
    console.log(registrationData);
  }

  const validateEmail = (value: string) =>{
    if(value==='') return ''
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase())?'':'Email is not valid!'
  }

  const handleSubmit = (event : any) => {}

  const optionsOftechnologies: IDropdownOption[] = props.technology.map((item)=>{
    return {key:item.toLowerCase(), text:item}
  })

  const optionsOfCountries: IDropdownOption[] = props.country.map((item)=>{
    return {key:item.toLowerCase(), text:item}
  })

  const modalText = `Your application has been successfully sent.
  Our specialist will connect with you soon.`

  const uploadFile = (event) => {
    setFileName(event.target.files[0].name)
  }
  
  return (
    <>
      <ModalWindow open={isModalOpen} text={modalText} hideModal={hideModal}/>
      <div className={contentStyles.container} >
        <h2 style={{margin:'2em 0 1em'}}>{props.name}</h2>
        <Stack className={contentStyles.formWrapper} 
        horizontal tokens={{ childrenGap: '40px' }}  
        onSubmit={handleSubmit}>
          <Stack tokens= { {childrenGap: '20px'}}
          styles = {{root:{width:'520px'}}}  >
            <div className='username' >
              <TextField
              data-type='fullName'
              placeholder="First and Last name *"
              type='text' 
              name='username' 
              value={registrationData.fullName} 
              onChange={handleFieldChange}
              styles={textFieldStyles}/>
            </div>
            <div className='email' >
              <TextField
              data-type='email'
              placeholder='email *'
              type='text' 
              name='email' 
              value={registrationData.email} 
              onChange={handleFieldChange}
              onGetErrorMessage = {validateEmail}
              styles={textFieldStyles}/>
            </div>
            <div className='phone'>
              <TextField 
              data-type='phoneNumber'
              placeholder="phone"
              name='phone' 
              value={registrationData.phoneNumber} 
              onChange={handleFieldChange}
              validateOnFocusOut={true}
              styles={textFieldStyles}
              />
            </div>
            <div className='skype'>
              <TextField 
              data-type='skype'
              placeholder="skype"
              name='skype' 
              value={registrationData.skype} 
              onChange={handleFieldChange}
              validateOnFocusOut={true}
              styles={textFieldStyles}
              />
            </div>
          </Stack>
          <Stack tokens= { {childrenGap: "20px"}} 
          styles = {{root:{width:'520px'}}} >
            <Dropdown
              data-type= 'country'
              placeholder='Country'
              options={optionsOfCountries}
              selectedKeys={[registrationData.country]}
              onChange={(e,i)=>{setCountryStatus({disable:false}); handleDropdownChange(e,i)}}
            />
            <Dropdown
              data-type= 'city'
              placeholder='City'
              options={exampleOptionsOfCities}
              disabled={countryStatus.disable}
              onChange={handleDropdownChange}
            />
            <Dropdown
              data-type= 'technology'
              placeholder='Technology'
              options={optionsOftechnologies}
              onChange={handleDropdownChange}
            />
        </Stack>
      </Stack>
      <TextField
      data-type='summary'
      value={registrationData.summary}
      onChange={handleFieldChange}
      className={contentStyles.lab} 
      multiline resizable={false} />
      <Text className={contentStyles.lab} nowrap block>* Fields marked with * are required</Text>
      <input type='file' id="files" className="input-file__input" onChange={uploadFile}/>
      <label htmlFor="files" className="input-file__label">Загрузить файл</label>
      <span>{fileName}</span>
      <div className={contentStyles.checkboxes}>
      <Checkbox
        label='By applying for this position, I submit my personal data to the Exadel and give my consent for the processing of personal data for job recruitment purpose'
      />
            <Checkbox
        label='I understand and accept that for purpose of evaluation of my application, professional skills and experience my personal data may be accessible to the intra-group companies of Exadel'
      />
      </div>
      <PrimaryButton className="button margin2em button_center" text='Submit' onClick={showModal}/>
    </div>
  </ >
  )
}

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

  checkboxes:{
    margin:'0 auto',
    marginTop:'20px',
    marginBottom:'20px',
    maxWidth:'800px'
  },

  lab:{
    backgroundColor:'transparent',
    margin:'20px 0',
  },

  submitButton:{
    margin:'0 auto',
    display: 'flex'
  }
});