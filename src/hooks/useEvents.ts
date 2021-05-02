import axios from "axios";
import { ActionTypes } from "../context/actionTypes";
import { useStore } from "./hooks";
import { fakeRequestEvents } from "../fakeDB/fakeRequest";
import { IEvent } from "../models/IEvent";

export const useEvents = () => {
  const { state, dispatch } = useStore();

  const fetchEvents = (page, size) => {
    axios
      .get(`http://localhost:8081/api/events?page=${page}&size=${size}`)
      .then((res) => {
        dispatch({
          type: ActionTypes.FETCH_EVENTS,
          payload: res.data.content,
        });
      })
      .catch((err) => console.log(err));
    // fakeRequestEvents.then((res) => {
    //   dispatch({
    //     type: ActionTypes.FETCH_EVENTS,
    //     payload: JSON.parse(res),
    //   });
    // });
  };

  const selectEvent = (id: string | number) => {
    if (state.events[id]) {
      dispatch({
        type: ActionTypes.SELECT_EVENT,
        payload: state.events[id],
      });
    } else {
      axios.get(`http://localhost:8081/api/events/${id}`).then((res) => {
        dispatch({
          type: ActionTypes.SELECT_EVENT,
          payload: res.data,
        });
      });
    }
  };


  const createEvent = (event) => {
    const headers = {
      'Content-Type': 'application/json'
  };
    const createEventForBackEnd = {
      city: event.city,
      description: event.summary,
      endDate: event.eventEndDate,
      name: event.fullName,
      startDate: event.eventStartDate,
      techs: event.technology,
      type: event.eventType
    }
    axios.post(`http://localhost:8081/api/events/create`, createEventForBackEnd, {headers}).then((res)=>console.log(res))
    console.log(event);
  };

  // {
  //   "cities": [
  //     "string"
  //   ],
  //   "description": "string",
  //   "endDate": "2021-04-30T06:24:44.984Z",
  //   "name": "string",
  //   "startDate": "2021-04-30T06:24:44.984Z",
  //   "techs": [
  //     "string"
  //   ],
  //   "type": "INTERNSHIP"
  // }

  return {
    selectedEvent: state.selectedEvent,
    events: state.events,
    selectEvent,
    fetchEvents,
    createEvent,
  };
};
