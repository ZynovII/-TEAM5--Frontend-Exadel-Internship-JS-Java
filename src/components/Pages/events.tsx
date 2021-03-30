import React, { Component } from 'react';

class Events extends Component {
  render() {
    return (
      <section className='events'>
        <div className="wrapper">
          <div className="events__title-wrapper">
            <h1 className='events__title'>{this.props.title}</h1>
            <p className='events__date'>{this.props.date}</p>
          </div>
        </div>
      </section>
    )
  }
}


export default Events;
