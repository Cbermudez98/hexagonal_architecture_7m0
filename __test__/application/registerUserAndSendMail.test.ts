import { RegisterUserAndSendMail } from "../../src/application/registerUserAndSendMail";
import { NotCreatedError } from "../../src/domain/errors/NotCreateError";
import { NotSendNotificationError } from "../../src/domain/errors/NotSendNotificationError";
import { IEmail } from "../../src/domain/interfaces/IEmail.interface";
import { IUserCreate, IUser } from "../../src/domain/interfaces/IUser.interface";
import { IEmailService } from "../../src/domain/services/IEmail.service";
import { IUserService } from "../../src/domain/services/IUser.service";

describe("Test use case register user and send mail", () => {
    // ARRANGE
    class UserServiceMock implements IUserService {
        async create(user: IUserCreate): Promise<IUser> {
            return {
                email: "",
                id: "2",
                lastName: "",
                name: ""
            };
        }

        async get(id: string): Promise<IUser> {
            return {
                email: "",
                id: "2",
                lastName: "",
                name: ""
            };
        }
    }

    class UserServiceErrorMock implements IUserService {
        async create(user: IUserCreate): Promise<IUser> {
            throw ""; // Las comillas vacias por defecto en javascript son false
        }

        async get(id: string): Promise<IUser> {
            return {
                email: "",
                id: "2",
                lastName: "",
                name: ""
            };
        }
    }

    class EmailServiceMock implements IEmailService {
        async send(email: IEmail): Promise<boolean> {
            return true;
        }
    }

    class EmailServiceErrorMock implements IEmailService {
        async send(email: IEmail): Promise<boolean> {
            return false;
        }
    }

    let useCase: RegisterUserAndSendMail;
    let useCaseError: RegisterUserAndSendMail;
    let useCaseUserError: RegisterUserAndSendMail;
    let emailSrvMock: IEmailService;
    let emailSrvErrorMock: IEmailService;
    let userSrvMock: IUserService;
    let userSrvErrorMock: IUserService;

    // HOOKS -> Ciclo de vida del test

    // beforeEach()

    // beforeAll()

    // afterEach()

    // afterAll()

    beforeEach(() => {
        userSrvMock = new UserServiceMock();
        userSrvErrorMock = new UserServiceErrorMock();
        emailSrvMock = new EmailServiceMock();
        emailSrvErrorMock = new EmailServiceErrorMock();
        useCase = new RegisterUserAndSendMail(userSrvMock, emailSrvMock);
        useCaseError = new RegisterUserAndSendMail(userSrvMock, emailSrvErrorMock);
        useCaseUserError = new RegisterUserAndSendMail(userSrvErrorMock, emailSrvErrorMock);
    });

    it("Should register an user and send mail with success", async () => {
        // MOCK -> Es una respuesta controlada de un servicio o provider para probar como se comporta mi implementacion con esa respuesta

        // ARRANGE
        const user: IUserCreate = {
            name: "Cesar",
            lastName: "Bermudez",
            email: "cesar@gmail.com"
        };

        // ACT
        const response = await useCase.register(user);

        // ASSERT
        expect(response).toStrictEqual({
            email: "",
            id: "2",
            lastName: "",
            name: ""
        });
    });

    it("Should fail at register and user at email service", async () => {
        const user: IUserCreate = {
            name: "Cesar",
            lastName: "Bermudez",
            email: "cesar@gmail.com"
        };
        try {
            await useCaseError.register(user);
        } catch (error) {
            expect(error).toBeInstanceOf(NotSendNotificationError);
        }
    });

    it("Should throw an type error of NotCreatedError", async () => {
        const user: IUserCreate = {
            name: "Cesar",
            lastName: "Bermudez",
            email: "cesar@gmail.com"
        };
        try {
            await useCaseUserError.register(user);
        } catch (error) {
            expect(error).toBeInstanceOf(NotCreatedError);
        }
    });
});