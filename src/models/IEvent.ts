export interface IEvent {
    id: number;
    date: Date;
    description: string;
    technology: string[]; // tags
    photoURL: string;
    type: string;
    location: string;
}
