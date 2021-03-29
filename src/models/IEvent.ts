export interface IEvent {
    id: number;
    date: Date;
    description: string;
    technology: string[];   // that should be tags?
    photoURL: string;
    type: string;
    location: string;
}