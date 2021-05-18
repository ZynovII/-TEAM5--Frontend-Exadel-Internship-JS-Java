import axios from "../axios-api";
import { ActionTypes } from "../context/actionTypes";

import { useStore } from "./hooks";
import { IEvent } from "../models/IEvent";
import { ID } from "../models/Store/IStore";

import { IEventForBackEnd } from "../models/IEvent";

export const useEvents = () => {
  const { state, dispatch } = useStore();

  const fetchEvents = (page, size, mounted) => {
    axios
      .get(`/events?page=${page}&size=${size}`)
      .then((res) => {
        if (mounted) {
          dispatch({
            type: ActionTypes.FETCH_EVENTS,
            payload: res.data.content,
          });
        }
      })
      .catch((err) => console.log(err));
  };
  const fetchPublishedEvents = (page, size, mounted) => {
    axios
      .get(
        `/events/published?page=${page}&size=${size}`
      )
      .then((res) => {
        if (mounted) {
          dispatch({
            type: ActionTypes.FETCH_PUBLISHED_EVENTS,
            payload: res.data.content,
          });
        }
      })
      .catch((err) => console.log(err));
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
      axios.get(`/events/${id}`).then((res) => {
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
      .post(`/events/create`, createEventForBackEnd)
      .then((res) => res.data.id)
      .then((id) => {
        const formData = new FormData();
        formData.append("file", imageSrc, imageSrc.name);
        axios.post(
          `/events/{id}/image/upload?id=${id}`,
          formData
        );
      });
  };

  const loadImage = async (id: ID) => {
    const res = await axios.get(
      `/events/${id}/image/exists`
    );
    if (res.data) {
      const img = await axios({
        url: `/events/${id}/image/download`,
        method: "GET",
        responseType: "blob",
      });
      return window.URL.createObjectURL(new Blob([img.data]));
    }
  };

  const replaceToArchive = (id: ID) => {
    const s = `/events/${id}/archive`;
    axios
      .get(s)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const publishEvent = (id: ID) => {
    axios
      .get(`/events/${id}/publish`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const isNameUniqe = async (value) => {
    const { data } = await axios.get(
      `/events/uniqueness/${value}`
    );
    return data || "This name is already used";
  };

  return {
    selectedEvent: state.selectedEvent,
    events: state.events,
    publishedEvents: state.publishedEvents,
    selectEvent,
    fetchEvents,
    createEvent,
    loadImage,
    fetchPublishedEvents,
    replaceToArchive,
    publishEvent,
    isNameUniqe
  };
};
