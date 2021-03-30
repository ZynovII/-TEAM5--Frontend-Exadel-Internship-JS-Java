export enum UserRole {
    Admin = "Admin",
    SuperAdmin = "SuperAdmin",
    TechSpec = "TechSpec",
}

export interface IUser {
    id: number;
    role: UserRole; // ???
    fullName: string;
    email: string;
    login: string;
    password: string;
}
