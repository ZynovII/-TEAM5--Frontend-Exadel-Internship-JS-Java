export interface IRegistartionProps {
  id: string;
  name: string;
  country: string[];
  technology: string[];
}

export interface IApplicant{
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  skype: string;
  technology: string; 
  events: number[]; 
  summary: string;
  country: string;
  city: string;
  time: string;
}