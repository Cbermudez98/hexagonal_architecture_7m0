import { IEmail } from "../interfaces/IEmail.interface";

export interface IEmailService {
    send: (email: IEmail) => Promise<boolean>;
}