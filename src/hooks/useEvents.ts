import axios from "../axios-api";
import { ActionTypes } from "../context/actionTypes";

import { useStore } from "./hooks";
import { ID } from "../models/Store/IStore";

import { EventStatus, IEventForBackEnd } from "../models/IEvent";
import { IFilterToRequest } from "../components/Filter/Models";

export const useEvents = () => {
  const { state, dispatch } = useStore();

  const fetchEvents = async function (
    page: number,
    size: number,
    filters?: IFilterToRequest,
    eventStatus?: EventStatus
  ) {
    let requestString = "";
    if (filters) {
      const country =
        filters.country?.toString() && filters.country.length
          ? `&country=${filters.country.join("&country=")}`
          : "";
      const status =
        filters.status?.toString() && filters.status.length
          ? `&status=${filters.status.join("&status=")}`
          : "";
      const tech =
        filters.tagPicker?.toString() && filters.tagPicker.length
          ? `&tech=${filters.tagPicker.join("&tech=")}`
          : "";
      const type = filters.eventType?.toString()
        ? `&type=${filters.eventType.join("&type=")}`
        : "";

      requestString = [country, status, tech, type]
        .filter((item) => item)
        .join("");
    }
    try {
      const res = await axios.get(
        `/events/getEventsWithFilter?&page=${page}&size=${size}${
          eventStatus ? "&status=" + eventStatus + requestString : requestString
        }`
      );

      let actionType: ActionTypes;
      switch (eventStatus) {
        case EventStatus.Published:
          requestString || filters
            ? (actionType = ActionTypes.FETCH_FILTERED_PUBL_EVENTS)
            : (actionType = ActionTypes.FETCH_PUBLISHED_EVENTS);
          break;
        case EventStatus.Archived:
          actionType = ActionTypes.FETCH_ARCHIVED_EVENTS;
          break;
        default:
          requestString || filters
            ? (actionType = ActionTypes.FETCH_FILTERED_ALL_EVENTS)
            : (actionType = ActionTypes.FETCH_EVENTS);
      }
      return () => {
        dispatch({
          type: actionType,
          payload: res.data.result.content,
        });
      };
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
        axios.post(`/events/{id}/image/upload?id=${id}`, formData);
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
      return window.URL.createObjectURL(new Blob([img.data]));
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

  const unPublishvent = async (id: ID) => {
    try {
      const res = await axios.put(`/events/${id}/unpublish`);
      return res;
    } catch (err) {
      console.log(err);
    }
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
    createEvent,
    loadImage,
    replaceToArchive,
    publishEvent,
    unPublishvent,
    isNameUniqe,
    fetchEvents,
    archivedEvents: state.archivedEvents,
  };
};
