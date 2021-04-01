import React from 'react';
import './EventPage.scss';
import IEventPage from '../../models/IEventPage';
import { TextField } from '@fluentui/react/lib/TextField';

// import { mergeStyleSets } from '@fluentui/react/lib';

const events = (props: IEventPage) => {
  return (
    <section className='events'>
      <div className="wrapper">
        <div className="events__title-wrapper">
          <div className="">
            <h1 className='events__title'>{props.title}</h1>
            <p className='events__date'>{props.date}</p>
          </div>
        </div>
        <div className='events__descrtiption-wrapper'>
          <div className="events__descrtiption-image-wrapper">
            <img className='events__descrtiption-image' src={props.photoURL} alt="#" />
          </div>
          <p className="events__descrtiption">{props.descrition}</p>
        </div>
        <div className='events__form'>
          <h2 className="events__form-title">Apply for {props.title}</h2>
          <div className='events__form-inputs'>
            <div className="">
              <TextField />
              <TextField />
              <TextField />
            </div>
            <div className="">
              <TextField />
              <TextField />
              <TextField />
            </div>
          </div>
          <textarea name=""></textarea>
        </div>
      </div>
    </section>
  )
}

// const styles = mergeStyleSets({})

export default events;