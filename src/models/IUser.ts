import { ID } from "./Store/IStore";

export enum UserRole {
  Admin = "ADMIN",
  SuperAdmin = "SUPERADMIN",
  TechSpec = "TECH",
}

export interface IUser {
  id: ID;
  role: UserRole;
  fullName: string;
  email: string;
}
