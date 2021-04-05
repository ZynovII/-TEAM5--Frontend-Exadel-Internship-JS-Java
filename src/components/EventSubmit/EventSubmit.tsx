import * as React from 'react';
import './styles/EventSubmit.scss';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import { DatePicker, DayOfWeek, IDatePickerStrings, mergeStyleSets } from '@fluentui/react';

import IEventSubmit from './IEventSubmit';

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { background: '#C4C4C4' } };

const DayPickerStrings: IDatePickerStrings = {
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
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
  monthPickerHeaderAriaLabel: '{0}, select to change the year',
  yearPickerHeaderAriaLabel: '{0}, select to change the month',
};


const eventSubmit = (props: IEventSubmit) => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    if (item) {
      setSelectedKeys(
        item.selected ? [...selectedKeys, item.key as string] : selectedKeys.filter(key => key !== item.key),
      );
    }
  };

  const [firstDayOfWeek] = React.useState(DayOfWeek.Monday);

  const option = (value) => {
    const options: IDropdownOption[] = value;
    return options;
  }

  const [openedState, setOpenedState] = React.useState({
    openedEvent: false
  })

  const style = {
    display: 'none'
  }

  if (openedState.openedEvent) {
    style.display = 'block';
  }

  const closeEvent = () => {
    setOpenedState({
      openedEvent: false
    })
  }

  const submitForm = (event) => {
    event.preventDefault();
    closeEvent();
  }

  return (
    <div>
      <div id='backdrop' onClick={closeEvent} style={style}></div>
      <div className="center-block">
        <div className='event-submit' style={style}>
          <div className="event-submit__wrapper">
            <header className='event-submit__title-wrapper'>
              <h2>New Event</h2>
            </header>
            <form className='event-submit__form' onSubmit={submitForm}>
              <div className='event-submit__body'>
                <div className='event-submit__image'>
                  <img src="https://via.placeholder.com/259x259" alt="#" />
                </div>
                <div className='event-submit__inputs'>
                  <TextField placeholder='Name' />
                  <DatePicker
                    firstDayOfWeek={firstDayOfWeek}
                    strings={DayPickerStrings}
                    placeholder="Date"
                    ariaLabel="Date"
                  />
                  <Dropdown styles={dropdownStyles} placeholder='Country' options={option(props.country)} />
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
    </div>
  )
}


export default eventSubmit;