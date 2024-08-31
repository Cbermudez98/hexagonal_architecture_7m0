import { IEmail } from "../../domain/interfaces/IEmail.interface";
import { IEmailService } from "../../domain/services/IEmail.service";

export class EmailService implements IEmailService {
    async send(email: IEmail): Promise<boolean> {
        try {
            console.log(email);
            return true;
        } catch (error) {
            return false;
        }
    }
}