import * as React from 'react';
import { TextField, MaskedTextField } from '@fluentui/utilities/lib/TextField';

const eventSubmit = () => {
  return(
    <div className = 'event-submit'>
      <div className="event-submit__wrapper">
        <header className= 'event-submit__title-wrapper'>
          <h2>New Event</h2>
        </header>
        <form className='event-submit__form'>
          <div className='event-submit__body'>
            <div className = 'event-submit__inputs'>

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