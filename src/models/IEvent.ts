import { ILocation } from "./ILocation";

export enum EventType {
  Internship = "INTERNSHIP",
  MeetUp = "MEETUP",
  Training = "TRAINING",
}
export enum EventStatus {
  Published = "PUBLISHED",
  Archived = "ARCHIVED",
  NotPublished = "NOT_PUBLISHED"
}
export interface IEvent {
  id: number;
  name: string;
  startDate: string;
  description: string;
  technology?: string;
  type: EventType;
  locations: ILocation[];
  eventStatus: EventStatus;
}
export interface IEventFromBackEnd {
  id: number;
  locations: ILocation[];
  name: string;
  startDate: string;
  type: EventType;
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
