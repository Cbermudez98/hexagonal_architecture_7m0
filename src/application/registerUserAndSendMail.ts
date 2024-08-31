import { IUserService } from './../domain/services/IUser.service';
import { IUser, IUserCreate } from "../domain/interfaces/IUser.interface";
import { NotCreatedError } from '../domain/errors/NotCreateError';
import { IEmailService } from '../domain/services/IEmail.service';
import { IEmail } from '../domain/interfaces/IEmail.interface';
import { NotSendNotificationError } from '../domain/errors/NotSendNotificationError';

export class RegisterUserAndSendMail {
    private mailAdmin: string = "admin@mysystem.com";

    constructor(
        private readonly userSrv: IUserService,
        private readonly emailSrv: IEmailService) {
    }

    async register(user: IUserCreate) {
        try {
            const newUser = await this.userSrv.create(user);
            const email: IEmail = {
                content: "Welcome" + newUser.name + " to this beautiful system",
                from: this.mailAdmin,
                subject: "Welcome message",
                to: newUser.email
            };
            const wasSent = await this.emailSrv.send(email);
            if(wasSent === false) {
                throw new NotSendNotificationError();
            }
            return newUser;
        } catch (error) {
            // if (error) {
            //     throw error;
            // } else {
            //     new NotCreatedError("Could not create a new user");
            // }
            throw error || new NotCreatedError();
        }
    }
}