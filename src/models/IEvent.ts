export interface IEvent {
  id: number;
  name: string;
  date: Date;
  description: string;
  technology: string[]; // tags
  photoURL: string;
  type: string;
  location: string;
}
