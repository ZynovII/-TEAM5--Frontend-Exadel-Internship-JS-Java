import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';


const eventSubmit = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    if (item) {
      setSelectedKeys(
        item.selected ? [...selectedKeys, item.key as string] : selectedKeys.filter(key => key !== item.key),
      );
    }
  };

  const option = (value) => {
    const options: IDropdownOption = value;
    return options;
  }

  return(
    <div className = 'event-submit'>
      <div className="event-submit__wrapper">
        <header className= 'event-submit__title-wrapper'>
          <h2>New Event</h2>
        </header>
        <form className='event-submit__form'>
          <div className='event-submit__body'>
            <div className = 'event-submit__inputs'>
              <TextField />
              <TextField />
              <Dropdown options = {option([])} />
              <Dropdown options = {option([])} />
              <Dropdown options = {option([{key: 'asdf', text: 'asd'}])} selectedKeys={selectedKeys} onChange={onChange} multiSelect />

            </div>
            <div className = 'event-submit__image-wrapper'>

            </div>
          </div>
          <div className = 'evnet-submit__description'>
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