import React from 'react';
import './EventPage.scss';
import IEventPage from '../../models/IEventPage';

// import { mergeStyleSets } from '@fluentui/react/lib';

const events = (props: IEventPage) => {
  return (
    <section className='events'>
      <div className="wrapper">
        <div className="events__title-wrapper">
          <h1 className='events__title'>{props.title}</h1>
          <p className='events__date'>{props.date}</p>
        </div>
        <div className='events__descrtiption-wrapper'>
          <div className="events__descrtiption-image-wrapper">
            <img src={props.photoURL} alt="#" />
          </div>
          <p className="events__description">{props.descrition}</p>
        </div>
      </div>
    </section>
  )
}

// const styles = mergeStyleSets({})

export default events;