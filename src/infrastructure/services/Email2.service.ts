import { IEmail } from "../../domain/interfaces/IEmail.interface";
import { IEmailService } from "../../domain/services/IEmail.service";

export class Email2Service implements IEmailService {
    async send(email: IEmail): Promise<boolean> {
        try {
            console.log("Sending to...", email.to);
            return false;
        } catch (error) {
            return false;
        }
    }
}