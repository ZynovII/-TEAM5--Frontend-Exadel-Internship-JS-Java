import { ID } from "./Store/IStore";

export enum UserRole {
  Admin = "Admin",
  SuperAdmin = "SuperAdmin",
  TechSpec = "TechSpec",
}

export interface IUser {
  id: ID;
  role: UserRole;
  fullName: string;
  email: string;
  login: string;
  password: string;
}
