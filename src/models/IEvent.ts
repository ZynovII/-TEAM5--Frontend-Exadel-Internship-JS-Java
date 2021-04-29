import { ILocation } from "./ILocation";
import { ID } from "./Store/IStore";

export enum EventType {
  Internship = "INTERNSHIP",
  MeetUp = "MEETUP",
  Training = "TRAINING",
}

export interface IEvent {
  id: ID;
  name: string;
  startDate: string;
  description: string;
  technology?: string;
  type: EventType;
  locations: ILocation[];
}
export interface IEventFromBackEnd {
  id: ID;
  locations: ILocation[];
  name: string;
  startDate: string;
  type: EventType;
}
