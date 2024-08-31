// Los nombres de mis metodos, sus parametros de entrada y sus salidas

import { IUser, IUserCreate } from "../interfaces/IUser.interface";

// SRP

export interface IUserService {
    create: (user: IUserCreate) => Promise<IUser>;
    get: (id: IUser["id"]) => Promise<IUser>;
}