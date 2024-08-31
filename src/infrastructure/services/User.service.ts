import { IUserCreate, IUser } from "../../domain/interfaces/IUser.interface";
import { IUserService } from "../../domain/services/IUser.service";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { IGenerateIdService } from "../interfaces/IGenerateId.service";

// Herencia || Composicion
// It's a   || Has a

// Clase de alto nivel
export class UserService implements IUserService {

    private users: IUser[] = [];

    // Clase de bajo nivel
    constructor(private readonly getIdSrv: IGenerateIdService) {
        
    }

    async create(user: IUserCreate): Promise<IUser> {
        const newUser: IUser = {
            id: this.getIdSrv.get(),
            ...user
        }
        this.users.push(newUser);
        return newUser;
    };

    async get(id: string): Promise<IUser> {
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            throw new NotFoundError();
        }
        return user;
        // let userFound: IUser | undefined = undefined;
        // for (let i = 0; i < this.users.length; i++) {
        //     const internalUser = this.users[i];
        //     if(internalUser.id === id) {
        //         userFound = internalUser;
        //     }
        // }
        // return userFound;
    };
}