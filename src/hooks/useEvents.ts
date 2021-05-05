import axios from "axios";
import { ActionTypes } from "../context/actionTypes";
import { URL, useStore } from "./hooks";
import { fakeRequestEvents } from "../fakeDB/fakeRequest";
import { IEvent } from "../models/IEvent";
import { ID } from "../models/Store/IStore";
import { IEventForBackEnd } from "../models/IEvent";

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

  const selectEvent = (id: ID) => {
    if (state.events[id]) {
      dispatch({
        type: ActionTypes.SELECT_EVENT,
        payload: state.events[id],
      });
    } else if (id === null) {
      dispatch({
        type: ActionTypes.SELECT_EVENT,
        payload: null,
      });
    } else {
      axios.get(`${URL}/api/events/${id}`).then((res) => {
        dispatch({
          type: ActionTypes.SELECT_EVENT,
          payload: res.data,
        });
      });
    }
  };

  const createEvent = (event: IEventForBackEnd, imageSrc: File) => {
    const createEventForBackEnd = {
      cities: event.cities,
      description: event.description,
      endDate: event.endDate,
      name: event.name,
      startDate: event.startDate,
      techs: event.techs,
      type: event.type[0],
    };
    axios
      .post(`http://localhost:8081/api/events/create`, createEventForBackEnd)
      .then((res) => res.data.id)
      .then((id) => {
        const formData = new FormData();
        formData.append("file", imageSrc, imageSrc.name);
        axios.post(
          `http://localhost:8081/api/events/{id}/image/upload?id=${id}`,
          formData
        );
      });
  };

  return {
    selectedEvent: state.selectedEvent,
    events: state.events,
    selectEvent,
    fetchEvents,
    createEvent,
  };
};
