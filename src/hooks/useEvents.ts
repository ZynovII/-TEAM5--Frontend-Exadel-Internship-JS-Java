import axios from "../axios-api";
import { ActionTypes } from "../context/actionTypes";

import { useStore } from "./hooks";
import { ID } from "../models/Store/IStore";

import { IEventForBackEnd } from "../models/IEvent";

export const useEvents = () => {
  const { state, dispatch } = useStore();

  const fetchEvents = async (page: number, size: number, filters?) => {
    if (filters) {
      const country =
        filters.country && filters.country.length
          ? `country=${filters.country.join("&country=")}`
          : "";
      const status =
        filters.status && filters.status.length
          ? `status=${filters.status.join("&status=")}`
          : "";
      const tech =
        filters.tech && filters.tech.length
          ? `tech=${filters.tech.join("&tech=")}`
          : "";
      const type = filters.type ? `type=${filters.type.join("&type=")}` : "";

      const requestString = [country, status, tech, type]
        .filter((item) => item)
        .join("&");
      try {
        const res = await axios.get(
          `/events/getEventsWithFilter?${requestString}&page=${page}&size=${size}`
        );
        return () => {
          dispatch({
            type: ActionTypes.APPLY_FILTERS,
          });
          dispatch({
            type: ActionTypes.FETCH_EVENTS,
            payload: res.data.content,
          });
        };
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.get(`/events?page=${page}&size=${size}`);
        return () => {
          dispatch({
            type: ActionTypes.FETCH_EVENTS,
            payload: res.data.content,
          });
        };
      } catch (err) {
        console.log(err);
      }
    }
  };
  const fetchPublishedEvents = async (page: number, size: number, filters?) => {
    try {
      if (filters) {
        console.log(filters, "filters");
        const country = filters.country
          ? `country=${filters.country.join("&country=")}`
          : "";
        const status =
          filters.status && filters.status.length
            ? `status=${filters.status.join("&status=")}`
            : "";
        const tech =
          filters.tech && filters.tech.length
            ? `tech=${filters.tech.join("&tech=")}`
            : "";
        const type = filters.type ? `type=${filters.type.join("&type=")}` : "";

        const requestString = [country, status, tech, type]
          .filter((item) => item)
          .join("&");
        console.log(requestString);

        const res = await axios.get(
          `/events/getEventsWithFilter?${requestString}&page=${page}&size=${size}`
        );
        return () => {
          dispatch({
            type: ActionTypes.APPLY_FILTERS,
          });
          dispatch({
            type: ActionTypes.FETCH_PUBLISHED_EVENTS,
            payload: res.data.result.content,
          });
        };
      } else {
        const res = await axios.get(
          `/events/published?page=${page}&size=${size}`
        );
        return () => {
          dispatch({
            type: ActionTypes.FETCH_PUBLISHED_EVENTS,
            payload: res.data.content,
          });
        };
      }
    } catch (err) {
      console.log(err);
    }
  };

  const selectEvent = (id: ID) => {
    if (state.events[id]) {
      dispatch({
        type: ActionTypes.SELECT_EVENT,
        payload: state.events[id],
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

  const createEvent = async (event: IEventForBackEnd, imageSrc: File) => {
    const createEventForBackEnd = {
      cities: event.cities,
      description: event.description,
      endDate: event.endDate,
      name: event.name,
      startDate: event.startDate,
      techs: event.techs,
      type: event.type[0],
    };
   await axios
      .post(`/events/create`, createEventForBackEnd)
      .then((res) => res.data.id)
      .then((id) => {if (imageSrc)
        {const formData = new FormData();
        formData.append("file", imageSrc, imageSrc.name);
        axios.post(`/events/${id}/image/upload`, formData);}
      });
  };

  const updateEvent = async (event: IEventForBackEnd, id: ID, imageSrc) => {
    const updateEventForBackEnd = {
      cities: event.cities,
      description: event.description,
      endDate: event.endDate,
      name: event.name,
      startDate: event.startDate,
      techs: event.techs,
      type: event.type,
    };
    await axios
      .put(`/events/${id}/edit`, updateEventForBackEnd)
      .then((res) => res.data.id)
    .then((id) => {if (imageSrc){
      const formData = new FormData();
      formData.append("file", imageSrc, imageSrc.name);
      axios.post(`/events/${id}/image/upload`, formData);}
      });
  };

  const loadImage = async (id: ID) => {
    const res = await axios.get(`/events/${id}/image/exists`);
    if (res.data) {
      const img = await axios({
        url: `/events/${id}/image/download`,
        method: "GET",
        responseType: "blob",
      });
      console.log(img)
      return img.data;
    }
    return null;
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
    const { data } = await axios.get(`/events/uniqueness/${value}`);
    return data || "This name is already used";
  };

  return {
    selectedEvent: state.selectedEvent,
    events: state.events,
    publishedEvents: state.publishedEvents,
    selectEvent,
    fetchEvents,
    createEvent,
    updateEvent,
    loadImage,
    fetchPublishedEvents,
    replaceToArchive,
    publishEvent,
    isNameUniqe,
  };
};
