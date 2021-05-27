import jwt_decode from "jwt-decode";
import { IUser } from "../models/IUser";

export const tokenToUser = (token: string) => {
  const userFromBack: any = jwt_decode(token);
  const user: IUser = {
    id: userFromBack.id,
    role: userFromBack.role,
    fullName: userFromBack.fullName,
    email: userFromBack.sub,
  };
  return user;
};
