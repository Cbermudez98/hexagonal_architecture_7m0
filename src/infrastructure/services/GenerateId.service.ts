import { v4 } from "uuid";
import { IGenerateIdService } from "../interfaces/IGenerateId.service";

export class GenerateIdService implements IGenerateIdService {
    get(): string {
        return v4();
    }
}