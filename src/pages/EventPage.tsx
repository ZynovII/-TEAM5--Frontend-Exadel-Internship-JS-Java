import React from 'react';

const events = (props: { title: 'string', date: 'string' }) => {
  return (
    <section className='events'>
      <div className="wrapper">
        <div className="events__title-wrapper">
          <h1 className='events__title'>{props.title}</h1>
          <p className='events__date'>{props.date}</p>
        </div>
      </div>
    </section>
  )
}

export default events;