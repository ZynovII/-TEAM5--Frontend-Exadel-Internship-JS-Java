export interface IUser {
    id: number;
    role: 'Admin' | 'SuperAdmin' | 'TechSpec';    // ???
    fullName: string;
    email: string;
    login: string;
    password: string;
}