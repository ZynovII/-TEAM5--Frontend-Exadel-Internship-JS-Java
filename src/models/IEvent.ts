import { ILocationForEvents } from "./ILocation";
import { ID } from "./Store/IStore";

export enum EventType {
  Internship = "INTERNSHIP",
  MeetUp = "MEETUP",
  Training = "TRAINING",
}
export enum EventStatus {
  Archived = "ARCHIVED",
  NotPublished = "NOT_PUBLISHED",
  Published = "PUBLISHED",
}
export interface ITech {
  id: ID;
  name: string;
}

export interface IEvent {
  id: ID;
  name: string;
  startDate: string;
  endDate: Date,
  description: string;
  techs: ITech[];
  type: EventType;
  locations: ILocationForEvents[];
  eventStatus: EventStatus;
}

export interface IEventForBackEnd {
  cities: string[];
  description: string,
  endDate: Date,
  name: string,
  startDate: Date,
  techs: string[],
  type: string,
}
