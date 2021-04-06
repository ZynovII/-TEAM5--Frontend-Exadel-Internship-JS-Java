import React from 'react';
import './EventSubmitForm.scss';

import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import DatePick from '../Helpers/DatePick/DatePick';


const eventSubmitForm = (props) => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    if (item) {
      setSelectedKeys(
        item.selected ? [...selectedKeys, item.key as string] : selectedKeys.filter(key => key !== item.key),
      );
    }
  };

  const option = (value) => {
    const options: IDropdownOption[] = value;
    return options;
  }
  return (
    <div className="center-block">
      <div className='event-submit'>
        <div className="event-submit__wrapper">
          <header className='event-submit__title-wrapper'>
            <h2>New Event</h2>
          </header>
          <form className='event-submit__form' onSubmit={props.submit}>
            <div className='event-submit__body'>
              <div className='event-submit__image'>
                <img src="https://via.placeholder.com/259x259" alt="#" />
              </div>
              <div className='event-submit__inputs'>
                <TextField placeholder='Name' />
                <DatePick />
                <Dropdown placeholder='Country' options={option(props.country)} />
                <Dropdown placeholder='City' options={option(props.city)} />
                <Dropdown placeholder='Technologies ' options={option(props.technology)} selectedKeys={selectedKeys} onChange={onChange} multiSelect />

              </div>
            </div>
            <div className='event-submit__description'>
              <textarea placeholder='Description'></textarea>
            </div>
            <div className='event-submit__button'>
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default eventSubmitForm;