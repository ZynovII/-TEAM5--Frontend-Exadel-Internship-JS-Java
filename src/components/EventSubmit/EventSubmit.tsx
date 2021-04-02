import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { DatePicker, DayOfWeek, IDatePickerStrings, mergeStyleSets } from '@fluentui/react';

import IEventSubmit from './IEventSubmit';

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

  return (
    <div className='event-submit'>
      <div className="event-submit__wrapper">
        <header className='event-submit__title-wrapper'>
          <h2>New Event</h2>
        </header>
        <form className='event-submit__form'>
          <div className='event-submit__body'>
            <div className='event-submit__inputs'>
              <TextField placeholder='Name' />
              <DatePicker
                firstDayOfWeek={firstDayOfWeek}
                strings={DayPickerStrings}
                placeholder="Date"
                ariaLabel="Date"
              />
              <Dropdown placeholder='Country' options={option(props.country)} />
              <Dropdown placeholder='City' options={option(props.city)} />
              <Dropdown placeholder='Technologies ' options={option(props.technology)} selectedKeys={selectedKeys} onChange={onChange} multiSelect />

            </div>
            <div className='event-submit__image-wrapper'>

            </div>
          </div>
          <div className='evnet-submit__description'>
            <textarea></textarea>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default eventSubmit;