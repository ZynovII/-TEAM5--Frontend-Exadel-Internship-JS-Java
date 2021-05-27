import axios from "../axios-api";
import { ActionTypes } from "../context/actionTypes";

import { useStore } from "./hooks";
import { ID } from "../models/Store/IStore";

import { IEventForBackEnd } from "../models/IEvent";

export const useEvents = () => {
  const { state, dispatch } = useStore();


  const fetchAnyEvents = async (page: number, size: number, category, filters?) => {
    
    let requestString =''
    let fetchType
    let clearType
    switch(category){
      case 'all':{
        category=''
        fetchType='FETCH_EVENTS'
        clearType='CLEAR_EVENTS'
        break
      }
      case 'published':{
        category='/published'
        fetchType='FETCH_PUBLISHED_EVENTS'
        clearType='CLEAR_PUBLISHED_EVENTS'
        break
      }
      case 'archived':{
        category='/archived'
        fetchType='FETCH_ARCHIVED_EVENTS'
        clearType ='CLEAR_ARCHIVED_EVENTS'
        break
      }
    }

    if (filters) {
      category='/getEventsWithFilter'
      const country =
        filters.country && filters.country.length
          ? `country=${filters.country.join("&country=")}`
          : "";
      const status =  filters.status && filters.status.length
          ? `status=${filters.status.join("&status=")}`
          : "";
      const tech =
        filters.tech && filters.tech.length
          ? `tech=${filters.tech.join("&tech=")}`
          : "";
      const type = filters.type ? `type=${filters.type.join("&type=")}` : "";
      console.log(status);
      
      requestString = [country, status, tech, type]
        .filter((item) => item)
        .join("&");
      console.log('filters',requestString);
    }
  
      try {
        const res = await axios.get(`/events${category}?${requestString}&page=${page}&size=${size}`);
        return () => {
          if(filters){
            dispatch({
              type: ActionTypes[clearType],
            });
          }
          dispatch({
            type: ActionTypes[fetchType],
            payload:(filters? res.data.result.content : res.data.content),
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
    isNameUniqe,
    fetchAnyEvents,
    archivedEvents:state.archivedEvents
  };
};
